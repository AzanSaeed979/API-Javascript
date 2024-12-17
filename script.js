const API_URL = 'https://jsonplaceholder.typicode.com/posts';
let localPosts = []; // Maintain a local array of posts
let currentPage = 1; // Track the current page
const postsPerPage = 5; // Define the number of posts per page

// Fetch and display posts
const fetchPosts = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch posts');

        const posts = await response.json();
        localPosts = posts.slice(0, 50); // Store the first 50 posts locally
        displayPosts(localPosts, currentPage); // Display the first page
    } catch (error) {
        console.error('Error:', error);
    }
};

// Display posts in the list
const displayPosts = (posts, page) => {
    const postList = document.getElementById('postList');
    postList.innerHTML = '';

    // Calculate the range of posts for the current page
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const paginatedPosts = posts.slice(startIndex, endIndex);

    // Display posts for the current page
    paginatedPosts.forEach(post => {
        const li = document.createElement('li');
        li.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <button onclick="deletePost(${post.id})">Delete</button>
        `;
        postList.appendChild(li);
    });

    displayPagination(posts); // Update pagination controls
};

// Add pagination controls
const displayPagination = (posts) => {
    const totalPages = Math.ceil(posts.length / postsPerPage); // Calculate total pages
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.classList.add('pagination-button');
        if (i === currentPage) button.classList.add('active'); // Highlight the active page

        button.addEventListener('click', () => {
            currentPage = i; // Update the current page
            displayPosts(localPosts, currentPage); // Refresh the displayed posts
        });

        paginationContainer.appendChild(button);
    }
};

// Add a new post
document.getElementById('postForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const body = document.getElementById('body').value;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, body, userId: 1 }),
        });

        if (!response.ok) throw new Error('Failed to add post');
        const newPost = await response.json();
        localPosts.unshift(newPost); // Add the new post locally at the top
        displayPosts(localPosts, currentPage); // Refresh the displayed list
        alert('Post added successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
});

// Delete a post
const deletePost = (id) => {
    // Simulate deletion in the localPosts array
    localPosts = localPosts.filter(post => post.id !== id);
    displayPosts(localPosts, currentPage); // Refresh the displayed list
    alert('Post deleted successfully!');
};

// Fetch posts on page load
fetchPosts();

Event Handling
function showmessage() {
    alert("Button Clicked");
}

const myHover = document.getElementById("Hovering");
myHover.onmouseover = () => {
  myHover.textContent = "Mouse Hovered";
};

myHover.onmouseout = () => {
  myHover.textContent = "Hovering";
};

const forming = document.getElementById("myform");

forming.addEventListener('submit', (e) => {
        e.preventDefault();
        const Inputs = document.getElementById("myInput").value;
        alert(`Input Value is: ${Inputs}`);

})

function Clear() {
    const Inputs = document.getElementById("myInput");
    myInput.value = "";
}

// const mylists = document.getElementById("list");
// const mybutton = document.getElementById("buttons");
// const mydelete = document.getElementById("del");


// mylists.addEventListener("click", (e) => {
//   if (e.target.tagName === "LI") {
//     alert(`List : ${e.target.textContent} `);
//   }
// });
// mybutton.addEventListener("click", () => {
//   const li = document.createElement("li");
//   li.textContent = `Item ${mylists.children.length + 1}`;
//   mylists.appendChild(li);
// });

// const deleted = document.createElement("button");
//   deleted.textContent = "Delete";
//   deleted.addEventListener("click", () => {
//     mylists.removeChild(li);
//   });
//   mylists.appendChild(deleted);


