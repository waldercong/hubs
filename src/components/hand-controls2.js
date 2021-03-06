import { paths } from "../systems/userinput/paths";

const POSES = {
  open: "open",
  point: "point",
  fist: "fist",
  hold: "hold",
  thumbUp: "thumbUp",
  thumbDown: "thumbDown",
  indexDown: "indexDown",
  pinch: "pinch",
  mrpDown: "mrpDown"
};

// TODO: If the hands or controllers are mispositioned, then rightHand.controllerPose and rightHand.pose
//       should be bound differently.
export const CONTROLLER_OFFSETS = {
  default: new THREE.Matrix4(),
  "oculus-touch-controls": new THREE.Matrix4().makeTranslation(0, -0.015, 0.04),
  "oculus-go-controls": new THREE.Matrix4(),
  "vive-controls": new THREE.Matrix4().compose(
    new THREE.Vector3(0, -0.017, 0.13),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(-40 * THREE.Math.DEG2RAD, 0, 0)),
    new THREE.Vector3(1, 1, 1)
  ),
  "windows-motion-controls": new THREE.Matrix4().compose(
    new THREE.Vector3(0, -0.017, 0.13),
    new THREE.Quaternion().setFromEuler(new THREE.Euler(-40 * THREE.Math.DEG2RAD, 0, 0)),
    new THREE.Vector3(1, 1, 1)
  ),
  "daydream-controls": new THREE.Matrix4().makeTranslation(0, 0, -0.04),
  "gearvr-controls": new THREE.Matrix4()
};

/**
 * Emits events indicating that avatar hands should be posed differently.
 * @namespace user-input
 * @component hand-controls2
 */
AFRAME.registerComponent("hand-controls2", {
  schema: { default: "left" },

  getControllerOffset() {
    if (CONTROLLER_OFFSETS[this.connectedController] === undefined) {
      return CONTROLLER_OFFSETS.default;
    }
    return CONTROLLER_OFFSETS[this.connectedController];
  },

  init() {
    this.pose = POSES.open;
    this.el.setAttribute("visible", false);

    this.connectedController = null;

    this.onControllerConnected = this.onControllerConnected.bind(this);
    this.onControllerDisconnected = this.onControllerDisconnected.bind(this);
    this.el.addEventListener("controllerconnected", this.onControllerConnected);
    this.el.addEventListener("controllerdisconnected", this.onControllerDisconnected);
  },

  update(prevData) {
    const el = this.el;
    const hand = this.data;

    const controlConfiguration = {
      hand: hand,
      model: false,
      orientationOffset: { x: 0, y: 0, z: 0 }
    };

    if (hand !== prevData) {
      el.setAttribute("vive-controls", controlConfiguration);
      el.setAttribute("oculus-touch-controls", controlConfiguration);
      el.setAttribute("oculus-go-controls", controlConfiguration);
      el.setAttribute("windows-motion-controls", controlConfiguration);
      el.setAttribute("daydream-controls", controlConfiguration);
      el.setAttribute("gearvr-controls", controlConfiguration);
    }
  },

  poseForFingers(thumb, index, middleRingPinky) {
    if (!thumb && !index && !middleRingPinky) {
      return POSES.open;
    } else if (thumb && index && middleRingPinky) {
      return POSES.fist;
    } else if (!thumb && index && middleRingPinky) {
      return POSES.thumbUp;
    } else if (!thumb && !index && middleRingPinky) {
      return POSES.mrpDown;
    } else if (!thumb && index && !middleRingPinky) {
      return POSES.indexDown;
    } else if (thumb && !index && !middleRingPinky) {
      return POSES.thumbDown;
    } else if (thumb && index && !middleRingPinky) {
      return POSES.pinch;
    } else if (thumb && !index && middleRingPinky) {
      return POSES.point;
    }

    console.warn(`Did not find matching pose for thumb ${thumb}, index ${index}, middleRingPinky ${middleRingPinky}`);
    return POSES.open;
  },

  tick() {
    const hand = this.data;
    const userinput = AFRAME.scenes[0].systems.userinput;
    const subpath = hand === "left" ? paths.actions.leftHand : paths.actions.rightHand;
    const hasPose = userinput.readFrameValueAtPath(subpath.pose);
    const thumb = userinput.readFrameValueAtPath(subpath.thumb);
    const index = userinput.readFrameValueAtPath(subpath.index);
    const middleRingPinky = userinput.readFrameValueAtPath(subpath.middleRingPinky);
    const pose = this.poseForFingers(thumb, index, middleRingPinky);
    if (pose !== this.pose) {
      this.el.emit("hand-pose", { previous: this.pose, current: pose });
      this.pose = pose;
    }
    this.el.setAttribute("visible", hasPose);
  },

  // Show controller when connected
  onControllerConnected(e) {
    this.connectedController = e.detail.name;
    this.el.setAttribute("visible", true);
  },

  // Hide controller on disconnect
  onControllerDisconnected() {
    this.connectedController = null;
    this.el.setAttribute("visible", false);
  }
});
