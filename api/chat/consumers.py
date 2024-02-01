from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
import json


class ChatConsumer(WebsocketConsumer):

    def connect(self):
        print("connect", self)
        user = self.scope['user']
        print("fffjfj",user)
        if not user.is_authenticated:
            return 
        
        self.username = user.username
        # join this user to a group with the same name as their username
        async_to_sync(self.channel_layer.group_add)(
            self.username, self.channel_name
        )

        self.accept()
          
    def disconnect(self, close_code):
        # leave the group
        async_to_sync(self.channel_layer.group_discard)(
            self.username, self.channel_name
        )

    # Handle requests from the client
    def receive(self, text_data):
        # receive message from WebSocket
        data = json.loads(text_data)
        print("receive", json.dumps(data, indent=4))