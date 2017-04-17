package com.github.uryyyyyyy.chat

import akka.actor.{Actor, ActorRef, ActorSystem, Props}
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.ws.{Message, TextMessage}
import akka.http.scaladsl.model.{HttpRequest, HttpResponse}
import akka.http.scaladsl.server.Directives._
import akka.pattern.ask
import akka.stream.scaladsl.{Flow, Sink, Source}
import akka.stream.{ActorMaterializer, OverflowStrategy}
import akka.util.Timeout

import scala.collection.mutable
import scala.concurrent.duration.{Duration, _}
import scala.concurrent.{Await, Future}

object Main {

  implicit val system = ActorSystem()
  implicit val materializer = ActorMaterializer()
  implicit val ec = system.dispatcher

  val helloActor = system.actorOf(Props[HelloActor])
  val idGenerator = system.actorOf(Props[IdGenerator])

  def wsFlow(): Flow[Message, Message, Any] = {
    implicit val timeout = Timeout(100.milliseconds)
    val id = Await.result(idGenerator ? "id please", Duration.Inf).asInstanceOf[Int]

    val sink = Flow[Message]
      .to(Sink.actorRef[Message](helloActor, (id, "complete")))

    val source: Source[Message, Any] = Source.actorRef(
      bufferSize = 100,
      overflowStrategy = OverflowStrategy.fail
    ).mapMaterializedValue(actorRef => helloActor ! (id, actorRef))

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


class HelloActor extends Actor{

  val map: mutable.Map[Int, ActorRef] = mutable.Map.empty

  def receive = {
    case (id: Int, ref: ActorRef) => map.put(id, ref)
    case (id: Int, "complete") => {
      println(s"complete ${id}")
      context.stop(map(id))
      map.remove(id)
    }
    case TextMessage.Strict(msg) => {
      println(msg)
      map.values.foreach(ref => ref ! TextMessage.Strict(msg))
    }
    case _ => println("???")
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