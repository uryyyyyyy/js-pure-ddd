package com.github.uryyyyyyy.chat

import akka.actor.ActorSystem
import akka.stream.ActorMaterializer

object AppContext {

  implicit val system = ActorSystem()
  implicit val materializer = ActorMaterializer()

}
