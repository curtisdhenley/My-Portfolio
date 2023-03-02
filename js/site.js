function fetchBlogData() {
    const baseUrl = "https://techture-production.up.railway.app/";

    fetch(`${baseUrl}api/BlogPosts?num=4`)
        .then((response) => response.json())
        .then(function (data) {
            // display the blog posts on the page
            displayBlogs(data, baseUrl)
        })
        .catch((reason) => console.error(reason));

}

function displayBlogs(blogPosts, baseUrl) {
    let template = document.getElementById('blog-template');
    let blogSection = document.getElementById('blogs');

    blogPosts.forEach( blogPost => {
        const articleCard = document.importNode(template.content, true);

        // set blog image link
        let imageDiv = articleCard.querySelector('[data-blog="imageLink"]');
        imageDiv.href = `${baseUrl}Content/${blogPost.slug}`;

        // create image element
        let blogImage = document.createElement('img');
        blogImage.classList.add('blog-image');
        blogImage.setAttribute('src', `data:${blogPost.imageType};base64,${blogPost.imageData}`);
        blogImage.setAttribute('target', '_blank');

        if (blogPost.imageData) {
            blogImage.setAttribute('src', `data:${blogPost.imageType};base64,${blogPost.imageData}`);
        } else {
            blogImage.setAttribute('src', `${baseUrl}img/DefaultBlogPostImage.jpg`);
        }

        // add it to the template
        imageDiv.appendChild(blogImage);

        // set date on image
        let blogDate = articleCard.querySelector('[data-blog="day"]');
        let blogMonth = articleCard.querySelector('[data-blog="month"]');
        let createdDate = new Date(blogPost.created);

        blogDate.textContent = createdDate.getDate();
        blogMonth.textContent = createdDate.toLocaleString('default', { month: 'long' });

        let blogTitle = articleCard.querySelector('[data-blog="title"]');
        blogTitle.textContent = blogPost.title;

        let blogAbstract = articleCard.querySelector('[data-blog="abstract"]');
        blogAbstract.textContent = blogPost.abstract;

        let buttonLink = articleCard.querySelector('[data-blog="buttonLink"]'); 
        buttonLink.href = `${baseUrl}/Content/${blogPost.slug}`;

        let updateText = articleCard.querySelector('[data-blog="updated"]');
        
        let today = new Date();

        let updated = new Date(blogPost.updated ? blogPost.updated : blogPost.created);

        let daysAgo = Math.ceil( (Math.abs( today.getTime() - updated.getTime() )) / (1000 * 60 * 60 * 24) );

        updateText.textContent = ( daysAgo == 1 ? `updated 1 day ago` : `updated ${daysAgo} days ago` );

        blogSection.appendChild(articleCard);
    });
}

