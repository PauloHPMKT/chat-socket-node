const room = window.location.pathname.replace(/\//g, '') // removendo ultima barra da rota na url

const socket = io(`http://localhost:3000/${room}`)

let user = null

socket.on('update_messages', (messages) => {
    updateMessagesOnScreen(messages)
})

const updateMessagesOnScreen = messages => {
    const divMessages = document.querySelector('#messages')

    let listMessages = '<ul>'
    messages.forEach(message => {
        listMessages += `<li>${message.user}: ${message.msg}</li>`
    })
    listMessages += '</ul>'

    divMessages.innerHTML = listMessages
}


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#message_form')

    form.addEventListener('submit', (e) => {
        e.preventDefault()

        if(!user) {
            alert('Defina um usuario')
            
            return
        }

        const message = document.forms['message_form_name']['msg'].value
        document.forms['message_form_name']['msg'].value = ''

        if(!message) {
            alert('Digite uma menssagem!')
        
            return
        }

        socket.emit('new_message', { user: user, msg: message })

        console.log(message)
    })

    const userForm = document.querySelector('#user_form')

    userForm.addEventListener('submit', (e) => {
        e.preventDefault()
        user = document.forms['user_form_name']['user'].value

        userForm.parentNode.removeChild(userForm)
    })
})