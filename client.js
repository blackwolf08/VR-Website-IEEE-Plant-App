// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import { ReactInstance, Module, Surface } from 'react-360-web';
import SimpleRaycaster from 'simple-raycaster';
import WebVRPolyfill from 'webvr-polyfill';
const polyfill = new WebVRPolyfill();

function init(bundle, parent, options = {}) {
  r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    nativeModules: [new surfaceModule()],
    ...options
  });
  introPanel = new Surface(
    500 /* width */,
    400 /* height */,
    Surface.SurfaceShape.Cylinder /* shape */
  );

  // Render your app content to the default cylinder surface
  introRoot = r360.renderToSurface(
    r360.createRoot('VR_plantapp', {
      /* initial props */
    }),
    introPanel
  );
  disease2 = new Surface(100, 100, Surface.SurfaceShape.Flat);

  disease2.setAngle(0.2 /* yaw angle */, 0 /* pitch angle */);

  disease4 = new Surface(100, 100, Surface.SurfaceShape.Flat);

  disease4.setAngle(Math.PI / 2 /* yaw angle */, 0 /* pitch angle */);

  disease3 = new Surface(100, 100, Surface.SurfaceShape.Flat);

  disease3.setAngle(-Math.PI / 2 /* yaw angle */, 0 /* pitch angle */);

  disease1 = new Surface(100, 100, Surface.SurfaceShape.Flat);

  disease1.setAngle(3.6 /* yaw angle */, 0 /* pitch angle */);

  // Load the initial environment
  r360.compositor.setBackground(r360.getAssetURL('360-world.jpg'));
  r360.controls.clearRaycasters();
  r360.controls.addRaycaster(SimpleRaycaster);
}
class surfaceModule extends Module {
  constructor() {
    super('surfaceModule');
  }

  resizeSurface(width, height, id) {
    if (id === 'disease4') {
      disease4.resize(width, height);
    } else if (id === 'disease3') {
      disease3.resize(width, height);
    } else if (id === 'disease1') {
      disease1.resize(width, height);
    } else if (id === 'disease2') {
      disease2.resize(width, height);
    }
  }

  start() {
    r360.renderToSurface(
      r360.createRoot('InfoPanel', {
        id: 'disease2',
        text:
          'Experts suggest measures to control disease in paddy. See here to read more.'
      }),
      disease2
    );

    r360.renderToSurface(
      r360.createRoot('InfoPanel', {
        id: 'disease1',
        text: 'Hyacinth bean, Field bean diseases, see here to read more.'
      }),
      disease1
    );

    r360.renderToSurface(
      r360.createRoot('InfoPanel', {
        id: 'disease4',
        text:
          'Fungal disease affects the wheat crop in West. See here to view how it can affect yours.'
      }),
      disease4
    );

    r360.renderToSurface(
      r360.createRoot('InfoPanel', {
        id: 'disease3',
        text: 'How to spray pesticides the best way! See here to view more.'
      }),
      disease3
    );

    r360.detachRoot(introRoot);
  }
}

window.React360 = { init };
