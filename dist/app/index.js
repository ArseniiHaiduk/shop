export default class App {
    constructor() {
        this.pageContent = document.querySelector("main");
        this.url = "/";
    }
    init() {
        this.setUrl();
        this.showPage();
        window.addEventListener("hashchange", this.handlePageChange.bind(this));
    }
    setUrl() {
        this.url = window.location.hash.replace(/^#/, "") || "/";
    }
    handlePageChange() {
        this.setUrl();
        this.showPage();
    }
    showPage() {
        console.log("URL:", this.url);
        if (!this.url || this.url === "/") {
            //TODO: show home page (products list)
            this.pageContent.innerHTML = "PRODUCT LIST";
            return;
        }
        if (/^\/product\/\d+/.test(this.url)) {
            //TODO: show home page (products list)
            this.pageContent.innerHTML = "PRODUCT DETAILS";
            return;
        }
        this.pageContent.innerHTML = "PAGE NOT FOUND";
    }
}
