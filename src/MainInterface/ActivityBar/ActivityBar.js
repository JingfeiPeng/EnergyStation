import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";
import {
  expandIcon,
  star,
  starOutline,
  excerciseIcon,
  studyIcon,
  healthyIcon,
  playIcon,
  Excercise,
  HealthyLife,
  Play,
  study,
} from "../../common/utility";

function decideIconType(type) {
  switch (type) {
    case Excercise:
      return excerciseIcon;
    case study:
      return studyIcon;
      break;
    case HealthyLife:
      return healthyIcon;
      break;
    case Play:
      return playIcon;
    default:
      return null;
  }
}

export default class ActivityBar extends Component {
  state = {
    starControlIcon: this.props.activity.complete ? star : starOutline,
    activityIcon: "",
  };

  changeStarHandler = () => {
    let copyActivity = this.props.activity;
    if (this.state.starControlIcon == starOutline) {
      this.setState({
        starControlIcon: star,
      });
      this.props.addPoint(this.props.activity.energyPtr);
      copyActivity.complete = true;
    } else {
      this.setState({
        starControlIcon: starOutline,
      });
      copyActivity.complete = false;
      this.props.addPoint(-1 * this.props.activity.energyPtr);
    }
    this.props.completeActivityHandler(copyActivity, this.props.identifier);
  };

  // load the icon according to type when started up
  componentWillMount() {
    const icon = decideIconType(this.props.activity.type);
    this.setState({ activityIcon: icon });
  }

  // load different Icon when state Changes
  componentWillReceiveProps() {
    const icon = decideIconType(this.props.activity.type);
    this.setState({ activityIcon: icon });
  }

  //selectHandler
  render() {
    const { activityName, energyPtr, length, startTime } = this.props.activity;
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.titleBar}>
            <Text style={styles.title}>
              {" "}
              {this.state.activityIcon} {activityName} - {startTime}{" "}
            </Text>
            <View
              style={{
                flexDirection: "row",
                width: 80,
                justifyContent: "space-around",
              }}
            >
              <TouchableHighlight onPress={() => this.changeStarHandler()}>
                {this.state.starControlIcon}
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => this.props.selectHandler(this.props.identifier)}
              >
                {expandIcon}
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.descriptions}>
            <Text>
              Length: <Text style={styles.length}> {length} mins </Text>
            </Text>
          </View>

          <View style={styles.descriptions}>
            <Text style={styles.EnergyContainer}>
              {" "}
              Energy: <Text style={styles.Energy}> {energyPtr} pts </Text>{" "}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "white",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    height: 110,
    justifyContent: "center",
    borderRadius: 5,
    marginLeft: 20,
  },
  titleBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    alignItems: "center",
  },
  title: {
    width: "70%",
    paddingTop: 5,
    fontSize: 20,
    fontWeight: "bold",
  },
  topline: {
    width: "10%",
    justifyContent: "flex-end",
  },
  length: {
    backgroundColor: "#ddd9d9",
    borderRadius: 10,
    padding: 5,
  },
  EnergyContainer: {
    color: "green",
  },
  Energy: {
    backgroundColor: "green",
    color: "white",
  },
  descriptions: {
    marginLeft: 20,
    marginBottom: 5,
  },
});
