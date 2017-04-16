package com.github.uryyyyyyy.chat

import java.util.concurrent.TimeUnit

import akka.NotUsed
import akka.actor.ActorSystem
import akka.http.scaladsl.Http
import akka.http.scaladsl.model.ws.{Message, TextMessage}
import akka.http.scaladsl.model.{HttpRequest, HttpResponse}
import akka.http.scaladsl.server.Directives._
import akka.stream.ActorMaterializer
import akka.stream.scaladsl.{Flow, Sink, Source}

import scala.concurrent.Future
import scala.concurrent.duration.FiniteDuration

object Main {

  val wsFlow: Flow[String, TextMessage, Any] = {

    val sink = Flow[String]
      .to(Sink.foreach(str => println(str)))

    val source: Source[TextMessage, Any] = Source.tick(
      FiniteDuration(1, TimeUnit.SECONDS),
      FiniteDuration(1, TimeUnit.SECONDS),
      TextMessage.Strict("hello"))

    Flow.fromSinkAndSource(sink, source)
  }

  val greeterWebSocketService: Flow[Message, Message, NotUsed] = Flow[Message]
    .collect { case TextMessage.Strict(msg) => msg }
    .via(wsFlow)

  def main(args: Array[String]): Unit = {

    implicit val system = ActorSystem()
    implicit val materializer = ActorMaterializer()
    implicit val ec = system.dispatcher

    val route: Flow[HttpRequest, HttpResponse, Any] = path("") {
      get {
        complete("ok")
      }
    } ~ get {
      path("chat") {
        handleWebSocketMessages(greeterWebSocketService)
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