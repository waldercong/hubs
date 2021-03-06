import { paths } from "../paths";
import { Pose } from "../pose";

const calculateCursorPose = function(camera, coords) {
  const cursorPose = new Pose();
  const origin = new THREE.Vector3();
  const direction = new THREE.Vector3();
  origin.setFromMatrixPosition(camera.matrixWorld);
  direction
    .set(coords[0], coords[1], 0.5)
    .unproject(camera)
    .sub(origin)
    .normalize();
  cursorPose.fromOriginAndDirection(origin, direction);
  return cursorPose;
};

export class AppAwareMouseDevice {
  constructor() {
    this.prevButtonLeft = false;
    this.clickedOnAnything = false;
  }

  write(frame) {
    if (!this.cursorController) {
      this.cursorController = document.querySelector("[cursor-controller]").components["cursor-controller"];
    }

    if (!this.camera) {
      this.camera = document.querySelector("#player-camera").components.camera.camera;
    }

    const coords = frame[paths.device.mouse.coords];
    const isCursorGrabbing = this.cursorController.data.cursor.components["super-hands"].state.has("grab-start");
    if (isCursorGrabbing) {
      frame[paths.device.smartMouse.cursorPose] = calculateCursorPose(this.camera, coords);
      return;
    }

    const buttonLeft = frame[paths.device.mouse.buttonLeft];
    if (buttonLeft && !this.prevButtonLeft) {
      const rawIntersections = [];
      this.cursorController.raycaster.intersectObjects(this.cursorController.targets, true, rawIntersections);
      const intersection = rawIntersections.find(x => x.object.el);
      this.clickedOnAnything =
        intersection &&
        intersection.object.el.matches(".pen, .pen *, .video, .video *, .interactable, .interactable *");
    }
    this.prevButtonLeft = buttonLeft;

    if (!buttonLeft) {
      this.clickedOnAnything = false;
    }

    if (!this.clickedOnAnything && buttonLeft) {
      frame[paths.device.smartMouse.cameraDelta] = frame[paths.device.mouse.movementXY];
    } else {
      frame[paths.device.smartMouse.cursorPose] = calculateCursorPose(this.camera, coords);
    }
  }
}
