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
  { label: '1/32"', value: 1/32 },
  { label: '1/16"', value: 1/16 },
  { label: '1/8"', value: 1/8 },
  { label: '1/4"', value: 1/4 },
  { label: '1/2"', value: 1/2 },
  { label: '5/8"', value: 5/8 },
  { label: '3/4"', value: 3/4 },
  { label: '1"', value: 1.0 },
  { label: '1 1/4"', value: 1.25 },
  { label: '1 1/2"', value: 1.50 },
  { label: '2"', value: 2.0 },
];

export const BIT_DIAMETERS_METRIC = [
  { label: '0.5 mm', value: 0.5/25.4 },
  { label: '1.0 mm', value: 1.0/25.4 },
  { label: '2.0 mm', value: 2.0/25.4 },
  { label: '3.0 mm', value: 3.0/25.4 },
  { label: '4.0 mm', value: 4.0/25.4 },
  { label: '5.0 mm', value: 5.0/25.4 },
  { label: '6.0 mm', value: 6.0/25.4 },
  { label: '8.0 mm', value: 8.0/25.4 },
  { label: '10.0 mm', value: 10.0/25.4 },
  { label: '12.0 mm', value: 12.0/25.4 },
  { label: '15.0 mm', value: 15.0/25.4 },
  { label: '20.0 mm', value: 20.0/25.4 },
  { label: '50.0 mm', value: 50.0/25.4 },
];

export const NUM_FLUTES = [
  1,
  2,
  3,
  4
];