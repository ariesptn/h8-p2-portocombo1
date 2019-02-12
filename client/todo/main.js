function onLoginChecked(isSuccess, response) {
    if (isSuccess) {
        $('#contents').show()
        $('#loginRegister').hide()
        $('#username').text(response.name)
        $('#email').text(response.email)
        getTodoList()
    }
    else {
        $('#contents').hide()
        $('#loginRegister').show()
        localStorage.removeItem('token')
        token = ''
        if (!JSON.stringify(response).includes('jwt')) {
            showError(response)
        }
    }
}

function showError(err) {
    $('#errorMessage').text(JSON.stringify(err))
    $('#errorMessage').show()
    setTimeout(() => {
        $('#errorMessage').hide()
    }, 10000)
    console.log(response)
}

$('#contents').hide()
$('#errorMessage').hide()
$('#todoForm').hide()
$('#projectForm').hide()
$('#projectFrame').hide()

$('#todoCancel').on('click', function () {
    $('#todoForm').hide()
})

$('#projectCancel').on('click', function () {
    $('#projectForm').hide()
})

$('#createPersonalTodo').on('click', function () {
    showCreateTodoForm()
})

$('#createProject').on('click', function () {
    showCreateProjectForm()
})

$('#getPersonalTodo').on('click', function () {
    getTodoList()
})

$('#getProjectList').on('click', function () {
    getProjectList()
})

$('#registerForm').show()
$('#loginForm').show()

$('#loginSubmit').on('click', function () {
    login({
        email: $('#loginEmail').val(),
        password: $('#loginPassword').val()
    })
})
$('#registerSubmit').on('click', function () {
    register({
        name: $('#registerName').val(),
        email: $('#registerEmail').val(),
        password: $('#registerPassword').val()
    })
})
