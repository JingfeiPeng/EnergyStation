import React, { Component } from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import { activitiesURL } from "../webService/urlLinks";
import ActivityBar from "./ActivityBar/ActivityBar";
import ActivityDetails from "./ActivityDetails/ActivityDetails";
import Topbar from "./Topbar/Topbar";
import Axios from "axios";
import { changeEnergyPtr } from "../store/actions/index";

class Home extends Component {
  state = {
    activityList: [],
    selectedActivity: null,
    selectedId: null,
    error: "",
  };

  fetchAllActivities = () => {
    // Axios.get(activitiesURL, { headers: { "X-Auth-Token": this.props.token } })
    Axios.get(activitiesURL, { headers: { "X-auth-token": this.props.token } })
      .then(async (res) => {
        await this.setState({ activityList: res.data });
        let totalPointsEarned = 0;
        for (let activity of this.state.activityList) {
          if (activity.complete) {
            totalPointsEarned += activity.energyPtr;
          }
        }
        if (totalPointsEarned > 0)
          this.props.onChangeEnergyPtr(totalPointsEarned);
      })
      .catch((err) => console.warn("while fetching all activities" + err));
  };

  componentDidMount() {
    this._navListener = this.props.navigation.addListener("didFocus", () => {
      StatusBar.setBarStyle("light-content");
      StatusBar.setBackgroundColor("#FDBE51");
      StatusBar.setTranslucent(false);
    });
    this.fetchAllActivities();
  }

  componentWillUnmount() {
    this._navListener.remove();
  }

  addPointHandler = (val) => {
    this.props.onChangeEnergyPtr(val);
  };

  activitySelectedHandler = (key) => {
    this.setState((prevState) => {
      return {
        selectedActivity: prevState.activityList.find((place, i) => {
          return i === key;
        }),
        selectedId: key,
      };
    });
  };

  // saving the activity while using modal
  modalSaveActivityHandler = async (activity, identifer) => {
    if (parseInt(identifer) == parseInt(this.state.activityList.length)) {
      await this.setState((prevState) => {
        return {
          activityList: prevState.activityList.concat(activity),
          selectedActivity: null,
          selectedId: null,
        };
      });
      try {
        await Axios.post(activitiesURL, activity, {
          headers: { "x-auth-token": this.props.token },
        });
      } catch (err) {
        console.warn(err);
      }
    } else {
      await Axios.put(`${activitiesURL}`, activity, {
        headers: { "x-auth-token": this.props.token },
      });
      await this.setState({
        activityList: this.state.activityList.map((val, index) => {
          if (index == identifer) {
            val.activityName = activity.activityName;
            val.energyPtr = activity.energyPtr;
            val.length = activity.length;
            val.hour = activity.hour;
            val.minute = activity.minute;
            val.type = activity.type;
          }
          return val;
        }),
        selectedActivity: null,
        selectedId: null,
      });
    }
  };

  addActivityHandler = () => {
    this.setState((prevState) => {
      return {
        selectedActivity: {
          activityName: "",
          energyPtr: "",
          length: "",
          startTime: new Date().getHours() + ":" + new Date().getMinutes(),
          type: "",
        },
        selectedId: prevState.activityList.length,
      };
    });
  };

  // requires: act1 and act2 must have sane field
  checkIfSameActivity = (act1, act2) => {
    let completeSame = true;
    for (field in act1) {
      if (act1[field] != act2[field]) {
        completeSame = false;
      }
    }
    return completeSame;
  };

  deleteActivityHandler = async () => {
    const _id = this.state.selectedActivity._id;
    try {
      await Axios.delete(`${activitiesURL}${_id}`, {
        headers: { "X-auth-token": this.props.token },
      });
      this.fetchAllActivities();
    } catch (err) {
      console.warn(err);
    }
  };

  modalCloseHandler = () => {
    this.setState({
      selectedActivity: null,
      selectedId: null,
    });
  };

  render() {
    const nickName = this.props.nickName;
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#FDBE51"
          barStyle="light-content"
          animated
        />
        <Topbar
          userName={nickName}
          curPoint={this.props.curPoint}
          addActivity={this.addActivityHandler}
        />
        <ActivityDetails
          activity={this.state.selectedActivity}
          selectId={this.state.selectedId}
          deleteActivity={this.deleteActivityHandler}
          onModalClosed={this.modalCloseHandler}
          onModalSave={this.modalSaveActivityHandler}
        />
        <ScrollView>
          {this.state.activityList.map((activity, index) => {
            return (
              <ActivityBar
                key={index}
                identifier={index}
                activity={activity}
                selectHandler={this.activitySelectedHandler}
                addPoint={this.addPointHandler}
                completeActivityHandler={this.modalSaveActivityHandler}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // account: state.generalReducer.account,
    // nickName: state.generalReducer.nickName,
    // curPoint: state.generalReducer.curPoint,
    // password: state.generalReducer.password,
    ...state.generalReducer,
  };
};

//dispatcher
const mapDispatchToProps = (dispatch) => {
  return {
    onChangeEnergyPtr: (ptrAmt) => dispatch(changeEnergyPtr(ptrAmt)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8dcdc",
  },
});
