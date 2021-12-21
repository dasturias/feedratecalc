export const HelpString = `Calculating Speeds and Feeds

It is important to note that there are many variables when setting CNC cutting parameters. The values set should be thought of a starting values.  With experience, these values can be modified to find the sweet spot for the project that you are working on.

Calculation details:

Surface Feet per Minute (SFM) Is a number that sets the best RPM for cutting the material. This number varies depending on the manufacture of the tool and CNC machine. The calculation is:
                SFM = RPM x 0.2618 x bit diameter (inches)

 We have added default SFM values. If SFM value is modified, it will change the RPM of the spindle.

Once the RPM is determined, you can calculate the feed rate with the formula
                Feed Rate = RPM x Flute count x Chip load

The flute count is the number of flutes on the bit, and the chip load is the size of the chip being removed. If the chip load value is modified, it will change the feed rate.
The plunge rate determines the feed rate of the Z axis as the bit plunges into the material. A good rule of thumb is to set the plunge rate to 1/2 the feed rate.
                Plunge Rate = 0.5 x Feed Rate

The step over is the space between the passes. The default step over value is set to 0.3 x bit diameter.  Stepover should be between 0.1 and 0.3 of the bit diameter
               Stepover = 0.3 X bit diameter

Depth per pass is determined by the CNC and the bit diameter. Larger heavy-duty CNC's can cut deeper per pass while smaller and lighter duty CNCs will cut at less depth per pass.`;

export const ROUTERS = {
  'Makita': {
    'minRpms': 10000,
    'maxRpms': 30000,
    'dial': {
      'min': 1,
      'max': 6
    }
  },
  'DeWalt': {
    'minRpms': 17000,
    'maxRpms': 27000,
    'dial': {
      'min': 1,
      'max': 6
    }
  },
};

export const CNC_MODELS = {
  'E Series': {
    supportedRouters: [],
  },
  'Evolution Series': {
    supportedRouters: ['Makita', 'DeWalt'],
  },
  'KL7 Series': {
    supportedRouters: ['Makita', 'DeWalt'],
  },
  'Revolution': {
    supportedRouters: [],
  },
  'Other': {
    supportedRouters: [],
  }
};

export const MATERIALS = {
  'Aluminum': {
    'sfm': 350,
    'dFactor': 5.0,
  },
  'Acrylic (hard)': {
    'sfm': 500,
    'dFactor': 1.05,
  },
  'Acetal (soft)': {
    'sfm': 450,
    'dFactor': 0.95,
  },
  'Foam Board': {
    'sfm': 1500,
    'dFactor': .5,
  },
  'Hardwood': {
    'sfm': 600,
    'dFactor': 1.1,
  },
  'MDF': {
    'sfm': 1000,
    'dFactor': 1.0,
  },
  'Plywood': {
    'sfm': 400,
    'dFactor': 1.0,
  },
  'Softwood': {
    'sfm': 950,
    'dFactor': 0.9,
  },
};

export const UNITS = [
  'inches',
  'mm'
];

export const BIT_DIAMETERS = [
  0.031,
  0.063,
  0.125,
  0.250,
  0.375,
  0.500,
  0.625,
  0.750,
  1.000,
  1.250,
  1.500,
  2.000
];

export const NUM_FLUTES = [
  1,
  2,
  3,
  4
];