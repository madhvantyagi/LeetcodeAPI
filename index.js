const newquery = `query getUserProfile($username: String!) {
    allQuestionsCount {
        difficulty
        count
    }
    matchedUser(username: $username) {
        username
        githubUrl
        twitterUrl
        linkedinUrl
        contributions {
            points
            questionCount
            testcaseCount
        }
        profile {
            realName
            userAvatar
            birthday
            ranking
            reputation
            websites
            countryName
            company
            school
            skillTags
            aboutMe
            starRating
        }
        badges {
            id
            displayName
            icon
            creationDate
        }
        upcomingBadges {
            name
            icon
        }
        activeBadge {
            id
            displayName
            icon
            creationDate
        }
        submitStats {
            totalSubmissionNum {
                difficulty
                count
                submissions
            }
            acSubmissionNum {
                difficulty
                count
                submissions
            }
        }
        submissionCalendar
    }
    recentSubmissionList(username: $username, limit: 20) {
        title
        titleSlug
        timestamp
        statusDisplay
        lang
    }
}`;
const cors = require("cors");
// module.exports = query;

const userDetailsFetch = async (req, res, query) => {
  let userName = req.url.replace("/", "");
  let limit = req.query.limit;
  var data = await fetch("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({
      query: query,
      variables: {
        username: userName, //username require
        limit: limit, //only for submission
      },
    }),
  });

  data = await data.json();

  return data.data;
};

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("It'working");
});

app.get("/MADHVAN", async (req, res) => {
  try {
    const data = await userDetailsFetch(req, res, newquery);
    // console.log(data);
    for (let key in data.matchedUser) {
      console.log(key);
      if (key == "submitStats") console.log(data.matchedUser.submitStats);
    }
    res.send(data.matchedUser.submitStats);
  } catch (error) {
    console.error("Error occurred:", error);
    // Handle the error as needed
    res.status(500).send("Internal Server Error");
  }
});

app.listen(5000, () => {
  console.log();
});
