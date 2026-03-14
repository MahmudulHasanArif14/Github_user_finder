const searchBtn = document.getElementById("searchBtn");
const input = document.getElementById("usernameInput");

const avatarSkeleton = document.getElementById("avatarSkeleton");
const avatarImg = document.getElementById("avatarImg");
const nameSkeleton = document.getElementById("nameSkeleton");
const userSkeleton = document.getElementById("userSkeleton");
const bioSkeleton = document.getElementById("bioSkeleton");
const profileName = document.getElementById("profileName");
const profileUsername = document.getElementById("profileUsername");
const profileBio = document.getElementById("profileBio");

const reposSkeleton = document.getElementById("reposSkeleton");
const reposLabelSkeleton = document.getElementById("reposLabelSkeleton");
const followersSkeleton = document.getElementById("followersSkeleton");
const followersLabelSkeleton = document.getElementById("followersLabelSkeleton");
const followingSkeleton = document.getElementById("followingSkeleton");
const followingLabelSkeleton = document.getElementById("followingLabelSkeleton");
const reposValue = document.getElementById("reposValue");
const followersValue = document.getElementById("followersValue");
const followingValue = document.getElementById("followingValue");

const locationEl = document.getElementById("location");
const companyEl = document.getElementById("company");
const blogEl = document.getElementById("blog");
const twitterEl = document.getElementById("twitter");
const extraSkeletons = [
  document.getElementById("extraSkeleton1"),
  document.getElementById("extraSkeleton2"),
  document.getElementById("extraSkeleton3"),
  document.getElementById("extraSkeleton4"),
];


const fetchUser= (username) => {
  return fetch(`https://api.github.com/users/${username}`).then((response) => {
    if (!response.ok) {
      throw new Error("User not found");
    }
    return response.json();
  })
  .then((data) => {
    console.log("Fetched user data:", data);
    return data;
  }).catch((error) => {
    console.error("Error fetching user data:", error);
    throw error;
  });
};






// const fetchUser = async (username) => {
//   const response = await fetch(`https://api.github.com/users/${username}`);
//   if (!response.ok) {
//     throw new Error("User not found");
//   }
//   return response.json();
// };

const   showSkeleton = () => {
  avatarSkeleton.classList.remove("hidden");
  nameSkeleton.classList.remove("hidden");
  userSkeleton.classList.remove("hidden");
  bioSkeleton.classList.remove("hidden");
  reposSkeleton.classList.remove("hidden");
  reposLabelSkeleton.classList.remove("hidden");
  followersSkeleton.classList.remove("hidden");
  followersLabelSkeleton.classList.remove("hidden");
  followingSkeleton.classList.remove("hidden");
  followingLabelSkeleton.classList.remove("hidden");
  extraSkeletons.forEach((el) => el.classList.remove("hidden"));

  document.querySelectorAll(".animate-pulse").forEach((el) => {
    el.classList.remove("animate-pulse");
  });

  avatarImg.classList.add("hidden");
  profileName.classList.add("hidden");
  profileUsername.classList.add("hidden");
  profileBio.classList.add("hidden");
  reposValue.classList.add("hidden");
  followersValue.classList.add("hidden");
  followingValue.classList.add("hidden");
  locationEl.classList.add("hidden");
  companyEl.classList.add("hidden");
  blogEl.classList.add("hidden");
  twitterEl.classList.add("hidden");
};

const showProfile = (data) => {
  console.log("Fetched user data:", data);
  avatarSkeleton.classList.add("hidden");
  nameSkeleton.classList.add("hidden");
  userSkeleton.classList.add("hidden");
  bioSkeleton.classList.add("hidden");
  reposSkeleton.classList.add("hidden");
  reposLabelSkeleton.classList.add("hidden");
  followersSkeleton.classList.add("hidden");
  followersLabelSkeleton.classList.add("hidden");
  followingSkeleton.classList.add("hidden");
  followingLabelSkeleton.classList.add("hidden");
  extraSkeletons.forEach((el) => el.classList.add("hidden"));

  avatarImg.src = data.avatar_url;
  avatarImg.alt = `${data.name || data.login}'s avatar`;
  avatarImg.classList.remove("hidden");

  profileName.textContent = data.name || data.login;
  profileUsername.textContent = `@${data.login}`;
  profileBio.textContent = data.bio || "No bio available.";
  profileName.classList.remove("hidden");
  profileUsername.classList.remove("hidden");
  profileBio.classList.remove("hidden");

  reposValue.textContent = data.public_repos ?? 0;
  followersValue.textContent = data.followers ?? 0;
  followingValue.textContent = data.following ?? 0;
  reposValue.classList.remove("hidden");
  followersValue.classList.remove("hidden");
  followingValue.classList.remove("hidden");

  locationEl.textContent = data.location ? `Location: ${data.location}` : "Location: N/A";
  companyEl.textContent = data.company ? `Company: ${data.company}` : "Company: N/A";
  blogEl.textContent = data.blog ? `Blog: ${data.blog}` : "Blog: N/A";
  twitterEl.textContent = data.twitter_username ? `Twitter: @${data.twitter_username}` : "Twitter: N/A";

  locationEl.classList.remove("hidden");
  companyEl.classList.remove("hidden");
  blogEl.classList.remove("hidden");
  twitterEl.classList.remove("hidden");
};

const handleSearch = async () => {
  const username = input.value.trim();
  if (!username) {
    alert("Please enter a GitHub username.");
    return;
  }

  showSkeleton();
  try {
    const data = await fetchUser(username);
    showProfile(data);
  } catch (error) {
    console.error(error);
    alert("User not found. Please check the username and try again.");
  }
};

searchBtn.addEventListener("click", handleSearch);
input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    handleSearch();
  }
});
