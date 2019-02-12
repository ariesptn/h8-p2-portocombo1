function onLoginChecked(isSuccess, response) {

}


let app = new Vue({
    el: '#app',
    created: function () {
        this.getArticles()
    },
    data: {
        message: 'Hello Vue',
        articleFormTitle: '',
        articleFormTags: '',
        articleFormContent: '',
        errorMessage: '',
        articles: [],
        articleTags: [],
        articleEditId: '',
        showArticles: true,
        showTags: true,
        showArticleForm: true,
    },
    methods: {
        showEmptyForm: function () {
            this.articleFormTitle = ''
            this.articleFormTags = ''
            this.articleFormContent = ''
            this.articleEditId = ''
        },
        showEditForm: function (article) {
            this.articleFormTitle = article.title
            this.articleFormTags = article.tags.join(',')
            this.articleFormContent = article.content
            this.articleEditId = article._id
        },
        getArticles: async function () {
            let response = await axios({
                baseURL: baseUrl,
                url: `/api/articles`,
                headers: { token },
            }).catch(this.showError)
            this.articles = response.data
            this.articleTags = Array.from(
                new Set(
                    this.articles
                        .map(e => e.tags)
                        .reduce((a, b) => a.concat(b), [])))
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
            }).catch(this.showError)
            this.getArticles()
        },
        articleDelete: async function (article) {
            let response = await axios({
                baseURL: baseUrl,
                url: `/api/articles/${article._id}`,
                method: 'DELETE',
                headers: { token },
            }).catch(this.showError)
            this.getArticles()
        },
        showError: function (error) {
            this.errorMessage = error
        }
    }
})

