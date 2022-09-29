![full_width](https://user-images.githubusercontent.com/63019625/192915304-9e61eac6-f3df-4136-b9bd-a4afdafd4da6.png)

# HelpQ
A mental health chat app for Courier Hacks!

## Live Website Link
Be sure to checkout our live website at: https://helpq.vercel.app/

## YouTube Showcase
Checkout our video demo below, where we show off Next.js, Firebase, Segment, and Courier in action!

[![helpq-demo-video](https://user-images.githubusercontent.com/63019625/192915831-4433756f-a7f6-4603-b82c-4868b7c7b2b0.png)](https://youtu.be/9K7giBJQ-48)

#### Inspiration
We are big fans of the Bell Let's Talk event, so we wanted to build something that could maybe be used for it!

#### What it does
HelpQ provides a simple way for people to anonymously talk to mental health professionals.

#### How we built it
We used Next.js for our front-end, and Firestore as our database. Firestore provides an awesome client, there was no need for a back-end. On the landing on the page, users can sign in using google authentication, or they can stay anonymous. If an anonymous user needs help, then create a "lobby", which will then trigger a Segment event, which then triggers a courier automation to notify our authenticated users that someone would like to talk. 

#### Challenges we ran into
We ran into some issues with the react components that courier offers since we were on React 18. 

#### Accomplishments that we're proud of
Given we started 24h before the deadline, we are very proud of what we were able to spin up!

#### What we learned
Start earlier next time! 

#### What's next for HelpQ
We're looking to polish up our UI, get the react components working (toast and inbox), and improve the courier automation to send to a list of authenticated users.
