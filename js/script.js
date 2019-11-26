'use strict';

const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    //console.log('Link was clicked!');
    //console.log(event);

    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    /* [DONE] add class 'active' to the clicked link */

    clickedElement.classList.add('active');
    //console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */

    const clickedLink = clickedElement.getAttribute('href');
    //console.log(clickedLink);

    /* find the correct article using the selector (value of 'href' attribute) */

    const refferedArticle = document.querySelector(clickedLink);
    //console.log(refferedArticle);

    /* [DONE] add class 'active' to the correct article */

    refferedArticle.classList.add('active');
}


//===============================================================================================
const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks(customSelector = '') {

    /* [DONE] remove contents of titleList */

    const titleList = document.querySelector(optTitleListSelector);
    //console.log(titleList);

    function clearMessages() {
        titleList.innerHTML = '';
        titleList.classList.remove('li');
    }
    clearMessages();

    /* [DONE] for each article */

    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log(customSelector);

    /* [DONE] get the article id */

    for (let article of articles) {
        const articleId = article.getAttribute('id');
        //console.log(articleId);

        /* [DONE] find the title element */
        /* [DONE] get the title from the title element */

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        //console.log(articleTitle);

        /* [DONE] create HTML of the link */

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        //console.log(linkHTML);

        /* [DONE] insert link into titleList */

        titleList.insertAdjacentHTML('beforeend', linkHTML);
    }
    const links = document.querySelectorAll('.titles a');
    //console.log(links);

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}
generateTitleLinks();

//======================================================================================
function generateTags() {
    /* find all articles */

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */

    for (let article of articles) {

        /* find tags wrapper */
        const tagsWrapper = article.querySelector(optArticleTagsSelector);

        function clearMessages() {
        tagsWrapper.innerHTML = '';
        }
        clearMessages();

        /* make html variable with empty string */

        let html = '';

        /* get tags from data-tags attribute */

        const articleTags = article.getAttribute('data-tags');
        console.log(articleTags);

        /* split tags into array */

        const articleTagsArray = articleTags.split(' ');
        console.log(articleTagsArray);

        /* START LOOP: for each tag */

        for (let tag of articleTagsArray) {
            console.log(tag);

            /* generate HTML of the link */
            const htmlLink = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
            console.log(htmlLink);

            /* add generated code to html variable */

            html = html + ' ' + htmlLink;
            console.log(html);

            /* END LOOP: for each tag */
        }

        /* insert HTML of all the links into the tags wrapper */

        tagsWrapper.insertAdjacentHTML('afterbegin', html);

        /* END LOOP: for every article: */
    }
}

generateTags();


//==========================================================================================================

function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log(href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log(tag);

    /* find all tag links with class active */
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTags);

    /* START LOOP: for each active tag link */
    for (let activeTag of activeTags) {

        /* remove class active */
        activeTag.classList.remove('active');
        console.log(activeTag);

        /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const sameTagLinks = document.querySelectorAll('a[href = "' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let sameTagLink of sameTagLinks) {

        /* add class active */
        sameTagLink.classList.add('active');
        console.log(sameTagLink);

        /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {

    /* find all links to tags */
    const links = document.querySelectorAll('.post-tags a');

    /* START LOOP: for each link */
    for (let link of links) {

        /* add tagClickHandler as event listener for that link */
        link.addEventListener('click', tagClickHandler);

        /* END LOOP: for each link */
    }
}

addClickListenersToTags();

//==============================================================================================================
