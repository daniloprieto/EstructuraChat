var express = require('express')
var Router = express.Router()

Router.get('/users',function(req, res){
  //get Usuario
})

Router.get('/messages',function(req, res){
  //get Messages
})

Router.post('/users',function(req, res){
  //post Usuario
})

Router.post('/messages',function(req, res){
  //post Messages
})

module.exports = Router

(function(document, window, undefined, $){
  (function(){
    return Chat = {
      //todo el codigo
      apiUrl: '/chat',
      $userDataModal: $('#modalCapture'),
      $btnMessages: $('#btnMessage'),
      $messageText: $('#messageText'),
      userName: '',

      init: function(){
        var self = this
        this.fetchUserInfo(function (user){
          self.renderUser(user)
        })
      },
      fetchUserInfo: function(callback){
        var self = this
        this.$userDataModal.openModal()
        var $GuardaInfo = $('.guardaInfo')
        $GuardaInfo.on('click',function(){
          var nombre = $('.nombreUsuario').val()
          var user = [{nombre: nombre, img: 'p2.png'}]
          callback(user)

          self.joinUser(user[0])


          self.userName = nombre
          self.$userDataModal.closeModal()
        })

        self.getInitialUsers()
      },
      getInitialUsers: function(){
        var self = this
        var endpoint = self.apiUrl + 'users'
        self.ajaxRequest(endpoint, 'GET', {})
            .done(function (data){
              var users = data.current
              self.renderUser(users)
            }).fail(function (err){
              console.log(err)
            })
      },
      ajaxRequest: function(url, type, data){
        return $.ajax({
          url: url,
          type: type,
          data: data
        })
      },
      joinUser: function(user){
        var self = this
        var endpoint = self.apiUrl + '/users'
        var userObj = {user: user}
        self.ajaxRequest()
            .done(function(confirm){
              console.log(confirm)
            }).fail(function (error){
              alert(error)
            })
      },
      renderUser: function(users){
        var self = this
        var userList = $('.users-list')
        var userTemplate = '<li class="collecion-item avatar">' +
                           '<img src="image/:image:" class="circle">' +
                           '<span class="title">:nombre:</span>' +
                           '<p><img src="image/online.png"/>En Linea </p>' +
                           '</li>'
        users.map(function(users){
          var newUser = userTemplate.replace(':image:', 'p2.jpg')
                                    .replace(':nombre:', user.nombre)
        })
      },
      watchMessages: function(){
        varself = this
        self.$messageText.on('keypress', function(e){
          if(e.which == 13){
            if($(this),val().trim()!=''){
              var message = {
                sender: self.userName,
                text: $(this).val()
              }
              self.renderMessage(message)
              $(this).val('')
            }else{
              e.preventDefault()
            }
          }
        })
        self.$btnMessages.on('click', function(){
          if(self.$messageText.val()!=''){
            var message = {
              sender: self.userName,
              text: $(this).val()
            }
            self.renderMessage(message)
            self.$messageText.val('')
          }
        })
      },
      renderMessage: function(message){
        var self = this
        var tipoMensaje = message.sender == self.userName ? 'recibidos' : 'enviados'
        var messageList = $('.historial-chat')
        var messageTemplate = '<div class=":tipoMensaje:">' +
                                '<div class="mensaje">' +
                                  '<div class="imagen">' +
                                    '<img src="image/p2.jpg" alt="contacto"/>' +
                                  '</div>' +
                                  '<div class="texto">' +
                                    '<span class="nombre">:nombre:</span><br>' +
                                    '<span>:mensaje:</span>' +
                                  '</div>' +
                                  '<div class="hora">' +
                                    '<span class="numHora">:hora:</span>' +
                                  '</div>' +
                                '</div>' +
                              '</div>' ;
        var currentDate = new Date()
        var newMessage = messageTemplate.replace(':tipoMensaje:', tipoMensaje)
                                        .replace(':nombre:', message.sender)
                                        .replace(':message:', message.text)
                                        //.replace(':hora:' , currentDate.getHours() + : currentDate.getMinutes() )
        messageList.append(newMessage)
        $(".scroller-chat").animate({ scrollTop: $(".scroller-char").get(0).scrollheight}, 500)

      }
    }
  })
})
