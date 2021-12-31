import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Card, Checkbox, Form, Input, Select } from 'antd';
import { CNC_MODELS, MATERIALS, UNITS, BIT_DIAMETERS, BIT_DIAMETERS_METRIC, NUM_FLUTES, HelpString } from './constants.jsx';
import {
  rpmCalculator,
  feedRateCalculator,
  dialNumCalculator,
  depthOfCutCalculator,
  chipLoadCalculator,
  plungeRateCalculator,
  stepOverCalculator,
  renderUnit,
} from './utils.jsx';

const generateOptions = (options) => {
  return options.map(option => { return { value: option }; });
};

const App = () => {
  const [model, setModel] = useState('Evolution Series');
  const [router, setRouter] = useState('Makita');
  const [material, setMaterial] = useState('Hardwood');
  const [units, setUnits] = useState('inches');
  const [bitDiameter, setBitDiameter] = useState(0.125);
  const [flutes, setFlutes] = useState(2);

  const sfm = MATERIALS[material].sfm;
  const defaultChipload = chipLoadCalculator(bitDiameter, sfm);
  const [chipLoad, setChipLoad] = useState(defaultChipload);
  const defaultRpms = rpmCalculator(sfm, bitDiameter, router);
  const [rpms, setRpms] = useState(defaultRpms);
  const [overrideChipload, setOverrideChipload] = useState(false);
  const [overrideRpms, setOverrideRpms] = useState(false);

  useEffect(() => {
    if(!overrideChipload) {
      setChipLoad(defaultChipload);
    }
  }, [bitDiameter, sfm, overrideChipload]);

  useEffect(() => {
    if(!overrideRpms) {
      setRpms(defaultRpms);
    }
  }, [sfm, bitDiameter, router, overrideRpms]);

  const feedRate = feedRateCalculator(rpms, flutes, chipLoad);
  const plungeRate = plungeRateCalculator(feedRate);
  const stepOver = stepOverCalculator(bitDiameter);
  const dialNum = dialNumCalculator(rpms, router);
  const depthOfCut = depthOfCutCalculator(bitDiameter, material, model);

  const [form] = Form.useForm();

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: '0 0 50%', padding: '10px 5px' }}>
        <Card title='Inputs'>
          <Form
            layout='formLayout'
            labelCol={{ 'span': 7 }}
            form={form}
            labelAlign='right'
            small='small'
          >
            <Form.Item label="CNC Model" tooltip='The Bob CNC model'>
              <Select
                options={generateOptions(Object.keys(CNC_MODELS))}
                value={model}
                onChange={val => {
                  setRouter('');
                  setModel(val);
                }}
              />
            </Form.Item>
            <Form.Item label="Router" tooltip='The router if provided'>
              <Select
                options={generateOptions(CNC_MODELS[model].supportedRouters)}
                value={router}
                onChange={setRouter}
                allowClear
              />
            </Form.Item>
            <Form.Item label="Material" tooltip='Material to be cutting'>
              <Select
                options={generateOptions(Object.keys(MATERIALS))}
                value={material}
                onChange={setMaterial}
              />
            </Form.Item>
            <Form.Item label="Units" tooltip='Units to be working with'>
              <Select
                options={generateOptions(UNITS)}
                value={units}
                onChange={val => {
                  setUnits(val);
                  if(val === 'inches') {
                    setBitDiameter(0.125);
                  } else {
                    setBitDiameter(2.0/25.4);
                  }
                }}
              />
            </Form.Item>
            <Form.Item label="Bit Diameter" tooltip='Diameter of the bit'>
              <Select
                options={units === 'inches' ? BIT_DIAMETERS : BIT_DIAMETERS_METRIC}
                value={bitDiameter}
                onChange={setBitDiameter}
              />
            </Form.Item>
            <Form.Item label="Number of Flutes" tooltip='Flutes on the bit'>
              <Select
                options={generateOptions(NUM_FLUTES)}
                value={flutes}
                onChange={setFlutes}
              />
            </Form.Item>
            <Form.Item label="Override Chip load" tooltip='Override chip load'>
              <Checkbox checked={overrideChipload} onChange={e => {
                setOverrideChipload(e.target.checked);
                // if chipload is being un-overridden set chip load back to the default
                if(!e.target.checked) {
                  setChipLoad(defaultChipload);
                }
              }}/>
            </Form.Item>
            <Form.Item label="Chip Load" tooltip={`Chip load in ${units}`}>
              <Input
                disabled={!overrideChipload}
                value={overrideChipload ? chipLoad : chipLoad.toFixed(4)}
                onChange={e => {
                  const value = parseFloat(e.target.value);
                  if(!isNaN(value)) {
                    setChipLoad(value);
                  }
                }}
              />
            </Form.Item>
            <Form.Item label="Override Spindle Speed" tooltip='Override Spindle Speed'>
              <Checkbox checked={overrideRpms} onChange={e => {
                setOverrideRpms(e.target.checked);
                // if chipload is being un-overridden set spindle back to the default
                if(!e.target.checked) {
                  setRpms(defaultRpms);
                }
              }}/>
            </Form.Item>
            <Form.Item label="Spindle Speed" tooltip='Spindle speed in RPMS'>
              <Input
                disabled={!overrideRpms}
                value={rpms}
                onChange={e => {
                  const value = parseInt(e.target.value);
                  if(!isNaN(value)) {
                    setRpms(value);
                  }
                }}
              />
            </Form.Item>
            <Form.Item label="Surface Speed" tooltip='Surface speed of material'>
              <Input
                disabled
                value={sfm}
              />
            </Form.Item>
          </Form>
        </Card>
        <Card title='Project Settings' style={{ marginBottom: 15 }}>
          {router && <div><b>{router} Dial:</b> {dialNum.toFixed(1)}</div>}
          <div><b>Feed rate:</b> {renderUnit(feedRate, units, '/minute', 0)}</div>
          <div><b>Plunge rate:</b> {renderUnit(plungeRate, units, '/minute', 0)}</div>
          <div><b>Step over:</b> {renderUnit(stepOver, units, '', 3)}</div>
          <div><b>Depth per pass:</b> {renderUnit(depthOfCut, units, '', 3)}</div>
        </Card>
      </div>
      <div style={{ flex: '0 0 50%', padding: '10px 5px' }}>
        <img src="img/BL2020.png" alt="Bob CNC logo" style={{width: '100%'}}/>
        <Card title='Calculation notes'>
          <div style={{ whiteSpace: 'break-spaces' }}>{HelpString}</div>
        </Card>
      </div>
    </div>

  );
};

ReactDOM.render(
  <App />,
  document.getElementById('main')
);