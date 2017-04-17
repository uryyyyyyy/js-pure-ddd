package com.github.uryyyyyyy.chat

import akka.actor.Props
import akka.stream.actor.ActorPublisher
import akka.stream.scaladsl.{Sink, Source}
import com.github.uryyyyyyy.chat.AppContext._
import org.reactivestreams.Publisher

import scala.collection.mutable

class ChatRepository(val array: mutable.ListBuffer[String]) {

  private val source = Source.actorPublisher(Props[MessagePublisher])

  private val (actorRef, publisher) = source.toMat(Sink.asPublisher[String](fanout = true))((a, b) => (a, b)).run()

  def getMessages(): Seq[String] = {
    this.array
  }

  def addMessage(msg: String): Unit = {
    this.array += msg
    actorRef ! msg
  }

  def getPublisher(): Publisher[String] = {
    this.publisher
  }
}

class MessagePublisher extends ActorPublisher[String] {
  def receive: Receive = {
    case "complete" => context.stop(self)
    case msg: String => onNext(msg)
  }
}

object ChatRepository {
  val instance = new ChatRepository(mutable.ListBuffer.empty)
}