function onLoginChecked(isSuccess, response) {
    if (isSuccess) {
        app.loggedIn = true
        app.userName = response.name
        app.userEmail = response.email
        app.getArticles()
    } else {
        app.loggedIn = false
        app.userName = ''
        app.userEmail = ''
    }
}

Vue.filter('striphtml', function (value) {
    var div = document.createElement("div")
    div.innerHTML = value
    var text = div.textContent || div.innerText || ""
    return text
})

let app = new Vue({
    el: '#app',
    components: {
        wysiwyg: vueWysiwyg.default.component,
    },
    created: function () {
        this.getArticles()
    },
    data: {
        userName: '',
        userEmail: '',
        loginEmail: '',
        loginPassword: '',
        registerName: '',
        registerEmail: '',
        registerPassword: '',
        loggedIn: false,
        articleFormTitle: '',
        articleFormTags: '',
        articleFormContent: '',
        articleEditId: '',
        errorMessage: '',
        allArticles: [],
        articles: [],
        articleTags: [],
        searchBox: '',
        showError: false,
        showArticles: false,
        showTags: false,
        showArticleForm: false,
    },
    watch: {
    },
    computed: {
        totalTagsOfArticles: function () {
            return new Set(
                this.articles.map(e => e.tags).reduce((a, b) => a.concat(b), [])).size
        },
    },
    methods: {
        switchPanel: function (panel) {
            this.showArticles = panel === 'articles'
            this.showTags = panel === 'tags'
            this.showArticleForm = panel === 'articleForm'
        },
        showEmptyForm: function () {
            this.switchPanel('articleForm')
            this.articleFormTitle = ''
            this.articleFormTags = ''
            this.articleEditId = ''
            this.articleFormContent = ''
        },
        showEditForm: function (article) {
            this.switchPanel('articleForm')
            this.articleFormTitle = article.title
            this.articleFormTags = article.tags.join(',')
            this.articleEditId = article._id
            this.articleFormContent = article.content
        },
        searchArticles: function () {
            this.switchPanel('articles')
            this.articles = this.allArticles.filter(e => {
                return e.title.includes(this.searchBox) || e.content.includes(this.searchBox) || e.tags.includes(this.searchBox)
            })
            this.articles.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            this.articleTags = Array.from(
                new Set(
                    this.articles
                        .map(e => e.tags)
                        .reduce((a, b) => a.concat(b), [])))
            this.articleTags.sort((a, b) => a - b)
        },
        tagSelect: function (tag) {
            this.searchBox = tag
            this.searchArticles()
        },
        getArticles: async function () {
            let response = await axios({
                baseURL: baseUrl,
                url: `/api/articles`,
                headers: { token },
            }).catch(this.displayError)
            this.allArticles = response.data
            this.searchArticles()
        },
        articleFormSubmit: async function () {
            let method = 'POST'
            if (this.articleEditId !== '') {
                method = 'PUT'
            }
            let response = await axios({
                baseURL: baseUrl,
                url: `/api/articles/${this.articleEditId}`,
                method,
                headers: { token },
                data: {
                    title: this.articleFormTitle,
                    tags: this.articleFormTags,
                    content: this.articleFormContent,
                }
            }).catch(this.displayError)
            this.getArticles()
        },
        articleDelete: async function (article) {
            let response = await axios({
                baseURL: baseUrl,
                url: `/api/articles/${article._id}`,
                method: 'DELETE',
                headers: { token },
            }).catch(this.displayError)
            this.getArticles()
        },
        login: function () {
            login({
                email: this.loginEmail,
                password: this.loginPassword,
            })
        },
        register: function () {
            register({
                name: this.registerName,
                email: this.registerEmail,
                password: this.registerPassword,
            })
        },
        logout() {
            signOut()
        },
        displayError: function (error) {
            if (!JSON.stringify(error).includes('jwt malformed')) {
                this.errorMessage = error
                this.showError = true
            }
            setTimeout(() => {
                this.errorMessage = ''
                this.showError = false
            }, 10000)
        },
    }
})
