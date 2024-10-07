let page = 1;
let isFetching = false;
const postsContainer = document.getElementById('posts-container');

async function fetchPosts() {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=6&_page=${page}`);
    const data = await response.json();

    if (data.length === 0) {
      console.log('No more posts to load.');
      window.removeEventListener('scroll', handleScroll);
      return;
    }

    displayPosts(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    isFetching = false;
  }
}

function displayPosts(posts) {
  posts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
    `;
    postsContainer.appendChild(postElement);
  });
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5 && !isFetching) {
    isFetching = true;
    page++;
    fetchPosts();
  }
}

window.addEventListener('scroll', handleScroll);

fetchPosts();
