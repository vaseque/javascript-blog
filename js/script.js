'use strict';

const opts = {

    articleSelector: '.post',
    titleSelector: '.post-title',
    titleListSelector: '.titles',
    articleTagsSelector: '.post-tags .list',
    articleAuthorSelector: '.post-author',
    tagsListSelector: '.tags .list',
    cloudClassCount: 5,
    cloudClassPrefix: 'tag-size-',
    authorsListSelector: '.authors.list',
};


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


function generateTitleLinks(customSelector = '') {

    const titleList = document.querySelector(opts.titleListSelector);

    function clearMessages() {

        titleList.innerHTML = '';

        titleList.classList.remove('li');

    }
    clearMessages();


    const articles = document.querySelectorAll(opts.articleSelector + customSelector);

    for (let article of articles) {

        const articleId = article.getAttribute('id');

        const articleTitle = article.querySelector(opts.titleSelector).innerHTML;

        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

        titleList.insertAdjacentHTML('beforeend', linkHTML);

    }

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {

        link.addEventListener('click', titleClickHandler);

    }

}
generateTitleLinks();


function calculateTagsParams(tags) {

    const params = {
        max: 0,
        min: 999999,
    };

    for (let tag in tags) {

        params.min = Math.min(tags[tag], params.min);

        params.max = Math.max(tags[tag], params.max);

    }

    return params;
}

function calculateTagsClass(count, params) {

    const normalizedCount = count - params.min;

    const normalizedMax = params.max - params.min;

    const percentage = normalizedCount / normalizedMax;

    const classNumber = Math.floor(percentage * (opts.cloudClassCount - 1) + 1);

    return opts.cloudClassPrefix + classNumber;

}


function generateTags() {

    let allTags = {};

    const articles = document.querySelectorAll(opts.articleSelector);

    for (let article of articles) {

        const tagsWrapper = article.querySelector(opts.articleTagsSelector);

        let html = '';

        const articleTags = article.getAttribute('data-tags');

        const articleTagsArray = articleTags.split(' ');

        for (let tag of articleTagsArray) {

            const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

            html = html + ' ' + linkHTML;

            if (!allTags.hasOwnProperty(tag)) {

                allTags[tag] = 1;

            } else {

                allTags[tag]++;

            }

        }

        tagsWrapper.insertAdjacentHTML('beforeend', html);

    }

    const tagList = document.querySelector('.tags');

    const tagsParams = calculateTagsParams(allTags);

    let allTagsHTML = '';

    for (let tag in allTags) {

        const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagsClass(allTags[tag], tagsParams) + '">' + tag + '</a><span>(' + allTags[tag] + ')</span></li>';
        allTagsHTML += tagLinkHTML;

    }

    tagList.innerHTML = allTagsHTML;

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

    const links = document.querySelectorAll('.tags a, .post-tags a');

    for (let link of links) {

        link.addEventListener('click', tagClickHandler);

    }
}

addClickListenersToTags();


function generateAuthors() {

    let allAuthors = {};

    const articles = document.querySelectorAll(opts.articleSelector);

    for (let article of articles) {

        const authorName = article.querySelector(opts.articleAuthorSelector);

        let html = '';

        const articleAuthor = article.getAttribute('data-author');

        const htmlLink = '<a href="#tag-' + articleAuthor + '">by ' + articleAuthor + '</a>';

        html = html + ' ' + htmlLink;

        if (!allAuthors.hasOwnProperty(articleAuthor)) {

            allAuthors[articleAuthor] = 1;

        } else {

            allAuthors[articleAuthor]++;

        }

        authorName.insertAdjacentHTML('afterbegin', html);

    }

    const authorList = document.querySelector(opts.authorsListSelector);


    let authorListHTML = '';


    for (let articleAuthor in allAuthors) {

        const authorLinkHTML = '<li><a href="#tag-' + articleAuthor + '">' + articleAuthor + '</a><span>(' + allAuthors[articleAuthor] + ')</span></li>';

        authorListHTML += authorLinkHTML;

    }

    authorList.innerHTML = authorListHTML;
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

    const links = document.querySelectorAll('.authors a');

    for (let link of links) {

        link.addEventListener('click', authorClickHandler);
    }
}

addClickListenersToAuthors();
