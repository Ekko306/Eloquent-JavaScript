// Exercises
// The following exercises will involve modifying the system defined in this chapter.
// To work on them, make sure you download the code first
// (https://eloquentjavascript.net/code/skillsharing.zip), have Node installed
// https://nodejs.org, and have installed the project’s dependency with npm install.


// // 1⃣️
// // Disk persistence
// // The skill-sharing server keeps its data purely in memory. This means that when it crashes or is restarted for any reason, all talks and comments are lost.
// //
// // Extend the server so that it stores the talk data to disk and automatically reloads the data when it is restarted. Do not worry about efficiency—do the simplest thing that works.
// // This isn't a stand-alone file, only a redefinition of a few
// // fragments from skillsharing/skillsharing_server.js
//
// const {readFileSync, writeFile} = require("fs");
//
// const fileName = "./talks.json";
//
// function loadTalks() {
//     let json;
//     try {
//         json = JSON.parse(readFileSync(fileName, "utf8"));
//     } catch (e) {
//         json = {};
//     }
//     return Object.assign(Object.create(null), json);
// }
//
// SkillShareServer.prototype.updated = function() {
//     this.version++;
//     let response = this.talkResponse();
//     this.waiting.forEach(resolve => resolve(response));
//     this.waiting = [];
//
//     writeFile(fileName, JSON.stringify(this.talks), e => {
//         if (e) throw e;
//     });
// };
//
// // The line that starts the server must be changed to
// new SkillShareServer(loadTalks()).start(8000);



// // 2⃣️
// // Comment field resets
// // The wholesale redrawing of talks works pretty well because you usually can’t
// // tell the difference between a DOM node and its identical replacement. But there
// // are exceptions. If you start typing something in the comment field for a talk in
// // one browser window and then, in another, add a comment to that talk, the field in
// // the first window will be redrawn, removing both its content and its focus.
// //
// // In a heated discussion, where multiple people are adding comments at the same
// // time, this would be annoying. Can you come up with a way to solve it?
// // This isn't a stand-alone file, only a redefinition of the main
// // component from skillsharing/public/skillsharing_client.js
//
// class Talk {
//     constructor(talk, dispatch) {
//         this.comments = elt("div");
//         this.dom = elt(
//             "section", {className: "talk"},
//             elt("h2", null, talk.title, " ", elt("button", {
//                 type: "button",
//                 onclick: () => dispatch({type: "deleteTalk",
//                     talk: talk.title})
//             }, "Delete")),
//             elt("div", null, "by ",
//                 elt("strong", null, talk.presenter)),
//             elt("p", null, talk.summary),
//             this.comments,
//             elt("form", {
//                     onsubmit(event) {
//                         event.preventDefault();
//                         let form = event.target;
//                         dispatch({type: "newComment",
//                             talk: talk.title,
//                             message: form.elements.comment.value});
//                         form.reset();
//                     }
//                 }, elt("input", {type: "text", name: "comment"}), " ",
//                 elt("button", {type: "submit"}, "Add comment")));
//         this.syncState(talk);
//     }
//
//     syncState(talk) {
//         this.talk = talk;
//         this.comments.textContent = "";
//         for (let comment of talk.comments) {
//             this.comments.appendChild(renderComment(comment));
//         }
//     }
// }
//
// class SkillShareApp {
//     constructor(state, dispatch) {
//         this.dispatch = dispatch;
//         this.talkDOM = elt("div", {className: "talks"});
//         this.talkMap = Object.create(null);
//         this.dom = elt("div", null,
//             renderUserField(state.user, dispatch),
//             this.talkDOM,
//             renderTalkForm(dispatch));
//         this.syncState(state);
//     }
//
//     syncState(state) {
//         if (state.talks == this.talks) return;
//         this.talks = state.talks;
//
//         for (let talk of state.talks) {
//             let cmp = this.talkMap[talk.title];
//             if (cmp && cmp.talk.presenter == talk.presenter &&
//                 cmp.talk.summary == talk.summary) {
//                 cmp.syncState(talk);
//             } else {
//                 if (cmp) cmp.dom.remove();
//                 cmp = new Talk(talk, this.dispatch);
//                 this.talkMap[talk.title] = cmp;
//                 this.talkDOM.appendChild(cmp.dom);
//             }
//         }
//         for (let title of Object.keys(this.talkMap)) {
//             if (!state.talks.some(talk => talk.title == title)) {
//                 this.talkMap[title].dom.remove();
//                 delete this.talkMap[title];
//             }
//         }
//     }
// }

