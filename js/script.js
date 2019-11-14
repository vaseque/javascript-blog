{
    'use strict';

    const titleClickHandler = function(event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');
        console.log(event);

        /* [DONE] remove class 'active' from all article links  */

        const activeLinks = document.querySelectorAll('.titles a.active');

        for (let activeLink of activeLinks) {
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */

        clickedElement.classList.add('active');
        console.log('clickedElement:', clickedElement);

        /* [DONE] remove class 'active' from all articles */

        const activeArticles = document.querySelectorAll('.post.active');

        for (let activeArticle of activeArticles) {
            activeArticle.classList.remove('active');
        }

        /* [DONE] get 'href' attribute from the clicked link */

        const clickedLink = clickedElement.getAttribute('href');
        console.log(clickedLink);

        /* find the correct article using the selector (value of 'href' attribute) */

        const refferedArticle = document.querySelector(clickedLink);
        console.log(refferedArticle);

        /* [DONE] add class 'active' to the correct article */

        refferedArticle.classList.add('active');
    }


    //===============================================================================================
    const optArticleSelector = '.post',
        optTitleSelector = '.post-title',
        optTitleListSelector = '.titles';

    function generateTitleLinks() {

        /* [DONE] remove contents of titleList */

        const titleList = document.querySelector(optTitleListSelector);
        console.log(titleList);

        function clearMessages() {
            titleList.innerHTML = '';
            titleList.classList.remove('li');
        }
        clearMessages();

        /* [DONE] for each article */

        const articles = document.querySelectorAll(optArticleSelector);
        console.log(articles);

        /* [DONE] get the article id */

        for (let article of articles) {
            const articleId = article.getAttribute('id');
            console.log(articleId);

            /* [DONE] find the title element */
            /* [DONE] get the title from the title element */

            const articleTitle = article.querySelector(optTitleSelector).innerHTML;
            console.log(articleTitle);

            /* [DONE] create HTML of the link */

            const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
            console.log(linkHTML);

            /* [DONE] insert link into titleList */

            titleList.insertAdjacentHTML('beforeend', linkHTML);
        }
        const links = document.querySelectorAll('.titles a');
        console.log(links);

        for (let link of links) {
            link.addEventListener('click', titleClickHandler);
        }
    }
    generateTitleLinks();
}
