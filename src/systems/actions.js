import { ringbuffer,  concatenate } from "./actions/utils";
import { keyboard, mouse, playercam } from "./actions/devices";
import { paths } from "./actions/paths";
import { bindings } from "./actions/bindDefns";
const devices = [keyboard, mouse];
const appdevices = [playercam];
const history = new ringbuffer();
const pendingSetChanges = [];
const bindDefn = concatenate(bindings);

function changeSets(){}

AFRAME.registerSystem("actions", {
  poll(action) {
    return history.read(0).actions[action];
  },

  isActive(set) {
    if (!this.didInit) return undefined;
    return history.read(0).sets.includes(set);
  },

  activate(set) {
    pendingSetChanges.push({ set, fn: "activate" });
  },

  deactivate(set) {
    pendingSetChanges.push({ set, fn: "deactivate" });
  },

  init() {
    this.didInit = true; // One day I'll work on a game where we decide the control flow,
    // but today is not that day. Components and systems initialize (and run) in an order
    // decided at runtime by the gods of wind and sand, so that poll may be called before
    // this init function runs.
    const frame = {
      sets: [
        "muteToggling",
        "screenShareToggling",
        "selfMoving",
        "selfSnapRotating",
        "notTransientLooking",
        "notLockedLooking",
        "cursorMoving",
        "debug"
      ],
      actions: {},
      priorities: {}
    };
    history.write(frame);
  },

  tick() {
    // read the previous frame from the history. we'll copy its
    // sets into the new frame
    const prev = history.read(0);

    const sets = [];
    const actions = {};
    const priorities = {};
    const frame = {sets, actions, priorities};
    changeSets(pendingSetChanges, frame.sets);
    pendingSetChanges.length = 0; // garbage

    devices.forEach(device => {
      device.tickInputFrame(frame); // Gather user provided state
    });
    appdevices.forEach(device => {
      device.tickInputFrame(frame); // Gather app provided state
    });
    bindDefn.forEach(binding => {
      resolveActions(frame);        // Combine user input with app state
    });

    history.write(frame);
    // The rest of the application runs after this point,
    // and we expect it to write to appdevices and to
    // enqueue set changes, so that if it were all in line here,
    // there would be as many calls to poll as there are
    // code paths that need an action to change app state in some way
  }
});
