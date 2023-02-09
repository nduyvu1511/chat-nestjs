import { AttachmentModule } from '@attachment/attachment.module'
import { conversationModule } from '@conversation/conversation.module'
import { GatewayModule } from '@gateway/gateway.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { NotificationModule } from '@notification/notification.module'
import { UserModule } from '@user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    MongooseModule.forRoot(process.env.MONGODB_URL),
    conversationModule,
    AttachmentModule,
    GatewayModule,
    NotificationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
