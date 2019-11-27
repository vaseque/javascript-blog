'use strict';

const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
        activeLink.classList.remove('active');
    }

    clickedElement.classList.add('active');

    const activeArticles = document.querySelectorAll('.post.active');

    for (let activeArticle of activeArticles) {
        activeArticle.classList.remove('active');
    }

    const clickedLink = clickedElement.getAttribute('href');

    const refferedArticle = document.querySelector(clickedLink);

    refferedArticle.classList.add('active');
}


const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list';


function generateTitleLinks(customSelector = '') {


    const titleList = document.querySelector(optTitleListSelector);

    function clearMessages() {
        titleList.innerHTML = '';
        titleList.classList.remove('li');
    }
    clearMessages();


    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    for (let article of articles) {
        const articleId = article.getAttribute('id');

        const articleTitle = article.querySelector(optTitleSelector).innerHTML;


        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';


        titleList.insertAdjacentHTML('beforeend', linkHTML);
    }
    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }
}
generateTitleLinks();


function generateTags() {

    const articles = document.querySelectorAll(optArticleSelector);


    for (let article of articles) {

        const tagsWrapper = article.querySelector(optArticleTagsSelector);

        function clearMessages() {
            tagsWrapper.innerHTML = '';
        }
        clearMessages();


        let html = '';


        const articleTags = article.getAttribute('data-tags');

        const articleTagsArray = articleTags.split(' ');

        for (let tag of articleTagsArray) {

            const htmlLink = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

            html = html + ' ' + htmlLink;

        }

        tagsWrapper.insertAdjacentHTML('afterbegin', html);

    }
}

generateTags();


function tagClickHandler(event) {

    event.preventDefault();

    const clickedElement = this;

    const href = clickedElement.getAttribute('href');

    const tag = href.replace('#tag-', '');

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let activeTag of activeTags) {

        activeTag.classList.remove('active');

    }

    const sameTagLinks = document.querySelectorAll('a[href = "' + href + '"]');

    for (let sameTagLink of sameTagLinks) {

        sameTagLink.classList.add('active');

    }

    generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {

    const links = document.querySelectorAll('.post-tags a');

    for (let link of links) {

        link.addEventListener('click', tagClickHandler);

    }
}

addClickListenersToTags();


function generateAuthors() {

    const articles = document.querySelectorAll(optArticleSelector);

    for (let article of articles) {

        const authorName = article.querySelector(optArticleAuthorSelector);

        let html = '';

        const articleTag = article.getAttribute('data-author');

        const htmlLink = '<a href="#tag-' + articleTag + '">by ' + articleTag + '</a>';

        html = html + ' ' + htmlLink;

        authorName.insertAdjacentHTML('afterbegin', html);

    }
}

generateAuthors();


function authorClickHandler(event) {

    event.preventDefault();

    const clickedElement = this;

    const href = clickedElement.getAttribute('href');

    const tag = href.replace('#tag-', '');

    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

    for (let activeTag of activeTags) {

        activeTag.classList.remove('active');

    }

    const sameTagLinks = document.querySelectorAll('a[href = "' + href + '"]');

    for (let sameTagLink of sameTagLinks) {

        sameTagLink.classList.add('active');

    }

    generateTitleLinks('[data-author="' + tag + '"]');
}

function addClickListenersToAuthors() {

    const links = document.querySelectorAll('.post-author a');

    for (let link of links) {

        link.addEventListener('click', authorClickHandler);
    }
}

addClickListenersToAuthors();


function generateTagsCloud() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

        /* find tags wrapper */
        const tagsWrapper = document.querySelector(optTagsListSelector);

        /* make html variable with empty string */
        let html = '';

        /* get tags from data-tags attribute */
        const tags = article.getAttribute('data-tags');

        /* split tags into array */
        allTags = tags.split(' ');


        /* START LOOP: for each tag */
        for (let tag of allTags) {

            /* generate HTML of the link */
            //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a><span></span></li>';

            /* add generated code to html variable */
            //html = html + ' ' + linkHTML;

            /* [NEW] check if this link is NOT already in allTags */
            if (!allTags.hasOwnProperty(tag)) {

                /* [NEW] add tags to allTags object */
                allTags[tag] = 1;

            } else {
                allTags[tag]++;
            }

            /* END LOOP: for each tag */
        }

        /* insert HTML of all the links into the tags wrapper */
        //tagsWrapper.insertAdjacentHTML('afterbegin', html);

        /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code*/
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in all tags*/
    for (let tag in allTags) {

    /* [NEW] generate code of a link and add it to allTagsHTML*/
        allTagsHTML += '<li><a href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a><span></span></li>';
    }
    /* [NEW] END LOOP: for each tag in allTags*/

    /* [NEW] add html from allTagsHTML to tagList*/
    tagList.innerHTML = allTagsHTML;
    console.log(tagList);

}

generateTagsCloud();
