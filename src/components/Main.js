import $, { each } from 'cash-dom';
import React from 'react';
import NavbarComp from './NavbarComp';
import Profile from './Profile';
import HistoryItem from './HistoryItem';
import { timingSafeEqual } from 'crypto';
require('isomorphic-fetch');


class App extends React.Component {
  constructor(){
    super();
    this.state={
      profAvatarSrc: 'http://placekitten.com/200/200',
      profName: 'John Smitht',
      profUrl: '@johnsmith',
      profDesc: 'Lorem ipsum dolor sit amet',
      history:[],
      histDate: [],
      histAvatarUrl: [],
      histProfileUrl: [],
      histLogin: [],
      histEventUrl: [],
      histEventType: [],
      histRepoUrl: [],
      histRepoName: [],
      histItemNum: 0
    };
  }

  checkInputTex() {
    const userName = $('.username.input').val();
    const reg = /[^a-z0-9_-]/;
    if (reg.test(userName)) {
      $('.username').addClass('redBorder');
      return false;
    } else {
      $('.username').removeClass('redBorder');
      return true;
    }
  }

  onButtonClick(){
    let isCorrectLogin = this.checkInputTex();
    let userName = $('.username.input').val();
    let historyResponse;
    if (isCorrectLogin && userName.length != 0) {
      $(`#spinner`).removeClass('is-hidden');
      fetch(`https://api.github.com/users/${userName}`)
        .then(response => response.json())
        .then(response => {
          if (response.login) {
            this.updateProfile(response);
            this.loadHistory();
          } else {
            this.profileNotFound();
          }
        })
        .then(() => {

          $(`#spinner`).addClass('is-hidden');
          $(`.profile`).removeClass('is-hidden');
        })
    }else{
      $('.username').addClass('redBorder');
    }
  }

  removeBorder(){
    $('.username').removeClass('redBorder');
  }

  updateProfile(apiResponse){
    this.setState({
      profAvatarSrc: apiResponse.avatar_url,
      profName: apiResponse.login,
      profUrl: apiResponse.html_url,
      profDesc: apiResponse.bio
    });
  }

  profileNotFound(){
    this.setState({
      profAvatarSrc: "http://placekitten.com/200/200",
      profName: "Profile not found",
      profUrl: "#",
      profDesc: ""
    });
  }

  loadHistory() {
    let userName = $(".username.input").val();
    fetch(`https://api.github.com/users/${userName}/events/public`)
      .then(response => response.json())
      .then(response => this.updateHistorySets(response));
  }

  updateHistorySets(response){
    const srchEventTable = [
      "PullRequestEvent",
      "PullRequestReviewCommentEvent"
    ];
    let userName = $('.username.input').val();
    let dateFormat = require('dateformat');
    const histDate = [];
    const histAvatarUrl = [];
    const histProfileUrl = [];
    const histLogin = [];
    const histEventUrl = [];
    const histEventType = [];
    const histRepoUrl = [];
    const histRepoName = [];

    response.forEach(singleEvent => {
      if (srchEventTable.indexOf(singleEvent.type) >= 0) {
        let dtime = new Date(singleEvent.created_at);
        let date = dateFormat(dtime, "mmm dd, yyyy");
        histDate.push(date);
        histAvatarUrl.push(singleEvent.actor.avatar_url);
        histProfileUrl.push(
          "https://github.com/" + singleEvent.actor.login
        );
        histLogin.push(singleEvent.actor.display_login);
        histEventUrl.push(singleEvent.payload.pull_request.html_url);
        histEventType.push(singleEvent.payload.action);
        histRepoUrl.push("https://github.com/" + singleEvent.repo.name);
        histRepoName.push(singleEvent.repo.name);
      }
    });

      this.setState({
        histDate: histDate,
        histAvatarUrl: histAvatarUrl,
        histProfileUrl: histProfileUrl,
        histLogin: histLogin,
        histEventUrl: histEventUrl,
        histEventType: histEventType,
        histRepoUrl: histRepoUrl,
        histRepoName: histRepoName,
        histItemNum: histDate.length
      })
  }

  render() {
    return (
      <div>
        <header>
          <NavbarComp
            loadButClick={this.onButtonClick.bind(this)}
            inputChange={this.checkInputTex.bind(this)}
            loadButBlur={this.removeBorder.bind(this)}
          />
        </header>
        <main>
          <div className="container">
            <div className="columns is-1-mobile">
              <Profile
                avatarSRC={this.state.profAvatarSrc}
                profileName={this.state.profName}
                profileUrl={this.state.profUrl}
                profileDesc={this.state.profDesc}
              />

              <div className="events-container column">
                <section>
                  <h2 className="subtitle is-4">History</h2>

                  <div className="timeline" id="user-timeline">
                    <HistoryItem
                      date={this.state.histDate[this.state.histItemNum-1]}
                      avatarUrl={this.state.histAvatarUrl[this.state.histItemNum-1]}
                      profileUrl={this.state.histProfileUrl[this.state.histItemNum-1]}
                      login={this.state.histLogin[this.state.histItemNum-1]}
                      eventUrl={this.state.histEventUrl[this.state.histItemNum - 1]}
                      eventType={this.state.histEventType[this.state.histItemNum - 1]}
                      repoUrl={this.state.histRepoUrl[this.state.histItemNum - 1]}
                      repoName={this.state.histRepoName[this.state.histItemNum - 1]}
                      isPrimary={false}
                    />
                    <HistoryItem
                      date={this.state.histDate[this.state.histItemNum - 2]}
                      avatarUrl={this.state.histAvatarUrl[this.state.histItemNum - 2]}
                      profileUrl={this.state.histProfileUrl[this.state.histItemNum - 2]}
                      login={this.state.histLogin[this.state.histItemNum -2]}
                      eventUrl={this.state.histEventUrl[this.state.histItemNum - 2]}
                      eventType={this.state.histEventType[this.state.histItemNum - 2]}
                      repoUrl={this.state.histRepoUrl[this.state.histItemNum - 2]}
                      repoName={this.state.histRepoName[this.state.histItemNum - 2]}
                      isPrimary={true}
                    />

                    <HistoryItem
                      date={this.state.histDate[this.state.histItemNum - 3]}
                      avatarUrl={this.state.histAvatarUrl[this.state.histItemNum - 3]}
                      profileUrl={this.state.histProfileUrl[this.state.histItemNum - 3]}
                      login={this.state.histLogin[this.state.histItemNum - 3]}
                      eventUrl={this.state.histEventUrl[this.state.histItemNum - 3]}
                      eventType={this.state.histEventType[this.state.histItemNum - 3]}
                      repoUrl={this.state.histRepoUrl[this.state.histItemNum - 3]}
                      repoName={this.state.histRepoName[this.state.histItemNum - 3]}
                      isPrimary={false}
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
      </div>
    );}
}

export default App;
