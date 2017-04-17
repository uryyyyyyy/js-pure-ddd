package com.github.uryyyyyyy.chat

import akka.actor.{Actor, Props}
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.ws.{Message, TextMessage}
import akka.http.scaladsl.model.{HttpRequest, HttpResponse}
import akka.http.scaladsl.server.Directives._
import akka.pattern.ask
import akka.stream.scaladsl.{Flow, Sink, Source}
import akka.util.Timeout
import com.github.uryyyyyyy.chat.AppContext._

import scala.concurrent.duration.{Duration, _}
import scala.concurrent.{Await, Future}

object Main {

  implicit val ec = system.dispatcher

  val idGenerator = system.actorOf(Props[IdGenerator])

  val repo = ChatRepository.instance

  def wsFlow(): Flow[Message, Message, Any] = {
    implicit val timeout = Timeout(100.milliseconds)
    val id = Await.result(idGenerator ? "id please", Duration.Inf).asInstanceOf[Int]
    val sink: Sink[Message, Any] = Sink.foreach[Message] {
      case TextMessage.Strict(msg) => repo.addMessage(msg)
      case _ => println("none")
    }
    val source: Source[Message, Any] = Source.fromPublisher(repo.getPublisher()).map(msg => TextMessage.Strict(msg))
    Flow.fromSinkAndSource(sink, source)
  }

  def main(args: Array[String]): Unit = {

    val route: Flow[HttpRequest, HttpResponse, Any] = path("") {
      get {
        complete("ok")
      }
    } ~ get {
      path("chat") {
        handleWebSocketMessages(wsFlow())
      }
    }

    val bindingFuture: Future[Http.ServerBinding] = Http().bindAndHandle(route, interface = "localhost", port = 8080)

    println(s"Server online at http://localhost:8080/\nPress RETURN to stop...")
    scala.io.StdIn.readLine()

    bindingFuture
      .flatMap(_.unbind())
      .onComplete(_ => system.terminate())
  }
}


class IdGenerator extends Actor{

  var id = 0

  def receive = {
    case "id please" => {
      this.id += 1
      sender() ! this.id
    }
    case _ => println("???")
  }
}