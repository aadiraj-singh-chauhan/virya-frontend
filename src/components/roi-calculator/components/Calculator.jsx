'use client';

import { useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import FormField from '@/components/shared/components/FormField';
import { VEHICLES, runCalc, formatResults } from '../lib/calculatorConfig';
import styles from '../css/Calculator.module.css';

const OP_TYPES = [
  { value: 'TUGG', label: 'Tugg' },
  { value: 'LIFT', label: 'Lift' },
];

const SHIFT_OPTIONS = [
  { value: 1, label: '1 Shift' },
  { value: 2, label: '2 Shifts' },
  { value: 3, label: '3 Shifts' },
];

function SegmentedToggle({ options, value, onChange }) {
  return (
    <div className={styles.toggle}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`${styles.toggleOption} ${value === opt.value ? styles.toggleActive : ''}`}
          onClick={() => onChange(opt.value)}
        >
          <span className="label-2 label-1-md">{opt.label}</span>
        </button>
      ))}
    </div>
  );
}

function VehicleOption({ label, capacity, active, onClick }) {
  return (
    <button type="button" className={styles.vehicleOption} onClick={onClick}>
      <span className={`${styles.radioBox} ${active ? styles.radioActive : ''}`} aria-hidden="true">
        <span className={styles.radioDot} />
      </span>
      <span className={styles.vehicleText}>
        <span className="label-2 label-1-md">{label}</span>
        <span className={styles.capacity}>
          <span className="label-2 label-1-md">{capacity}</span>
        </span>
      </span>
    </button>
  );
}

function Slider({ value, min, max, onChange }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={styles.sliderRow}>
      <span className={styles.sliderBound}>
        <span className="label-2 label-1-md">{min}</span>
      </span>
      <div className={styles.sliderTrack}>
        <span className={styles.sliderValue} style={{ left: `${pct}%` }}>
          <span className="label-2 label-1-md">{value}</span>
        </span>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={styles.range}
          style={{ '--fill': `${pct}%` }}
          aria-label="Value"
        />
      </div>
      <span className={styles.sliderBound}>
        <span className="label-2 label-1-md">{max}</span>
      </span>
    </div>
  );
}

function ResultsPanel({ result, onGetReport }) {
  const formatted = result ? formatResults(result) : null;
  const savingsText = formatted?.savingsText ?? '—';
  const paybackText = formatted?.paybackText ?? '—';
  const pctText = formatted?.pctText ?? '—';

  return (
    <div className={`${styles.resultsPanel} ${!result ? styles.zeroState : ''}`}>
      <p className="label-2 label-1-md">Projected ROI — 7 year analysis</p>

      <div className={styles.resultsGrid}>
        <div className={styles.resultCell}>
          <p className="label-2 label-1-md">Total Savings</p>
          <p className="heading-2 heading-2-md">{savingsText}</p>
          <span className={styles.resultCaption}>
            <span className="label-2 label-1-md">over 7 years</span>
          </span>
        </div>
        <div className={styles.resultCell}>
          <p className="label-2 label-1-md">Payback Period</p>
          <p className="heading-2 heading-2-md">{paybackText}</p>
          <span className={styles.resultCaption}>
            <span className="label-2 label-1-md">break-even point</span>
          </span>
        </div>
        <div className={styles.resultCell}>
          <p className="label-2 label-1-md">Cost Reduction</p>
          <p className="heading-2 heading-2-md">{pctText}</p>
          <span className={styles.resultCaption}>
            <span className="label-2 label-1-md">vs manual operations</span>
          </span>
        </div>
      </div>

      <div className={styles.ctaRow}>
        <Button type="button" property1="Default" onClick={onGetReport}>Get detailed report</Button>
        <p className="body-2">
          Want the full breakdown?{' '}
          <span className={styles.muted}>Our team will walk you through a customised analysis within 24 hours.</span>
        </p>
      </div>

      <div className={styles.disclaimer}>
        <p className="body-2">
          Note:{' '}
          <span className={styles.muted}>
            Results are estimated using industry-standard cost benchmarks for operator CTC, maintenance, AMC, and
            spares. Final projections may vary based on your facility&apos;s specific parameters — contact us for a
            tailored assessment.
          </span>
        </p>
      </div>
    </div>
  );
}

function Row({ label, desc, align, children }) {
  return (
    <div className={`${styles.row} ${align === 'start' ? styles.rowStart : ''}`}>
      <div className={styles.rowLabel}>
        <p className="title-2 title-2-md">{label}</p>
        {desc && (
          <div className={styles.rowDesc}>
            <p className="body-1 body-1-md">{desc}</p>
          </div>
        )}
      </div>
      <div className={styles.rowControl}>{children}</div>
    </div>
  );
}

export default function Calculator() {
  const [opType, setOpType] = useState('TUGG');
  const [vehicle, setVehicle] = useState(VEHICLES.TUGG[0].id);
  const [fleet, setFleet] = useState(17);
  const [operators, setOperators] = useState(20);
  const [shifts, setShifts] = useState(1);
  const detailsRef = useRef(null);
  const resultsRef = useRef(null);

  const [result, setResult] = useState(null);

  const vehicles = VEHICLES[opType] || [];

  const handleOpTypeChange = (val) => {
    setOpType(val);
    setVehicle((VEHICLES[val] || [])[0]?.id ?? '');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResult(runCalc({ opType, vehicle, fleet, operators, shifts }));
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleGetReport = () => {
    detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.wrap}>
        <form className={styles.card} onSubmit={handleSubmit}>
          <Row label="Operation type" desc="The type of operation used in your material handling flow.">
            <SegmentedToggle options={OP_TYPES} value={opType} onChange={handleOpTypeChange} />
          </Row>

          <Row label="Vehicle Type" desc="The primary machinery used in your material handling flow.">
            <div className={styles.vehicleOpts}>
              {vehicles.map((v) => (
                <VehicleOption
                  key={v.id}
                  label={v.label}
                  capacity={v.capacity}
                  active={vehicle === v.id}
                  onClick={() => setVehicle(v.id)}
                />
              ))}
            </div>
          </Row>

          <Row label="Fleet Size" desc="Total number of active units in the facility.">
            <Slider value={fleet} min={1} max={50} onChange={setFleet} />
          </Row>

          <Row label="Number of Operators" desc="Total staff qualified for vehicle operation.">
            <Slider value={operators} min={0} max={50} onChange={setOperators} />
          </Row>

          <Row label="Number of Shifts" desc="Shift cycles within a standard 24-hour window.">
            <SegmentedToggle options={SHIFT_OPTIONS} value={shifts} onChange={setShifts} />
          </Row>

          <Row label="Enter your details" align="start">
            <div className={styles.fields} ref={detailsRef}>
              <FormField idPrefix="roi" name="fullName" label="Enter your full name" />
              <FormField idPrefix="roi" name="companyName" label="Company name" />
              <FormField idPrefix="roi" name="companyEmail" label="Your company email" type="email" />
              <FormField idPrefix="roi" name="phoneNumber" label="Your phone number" type="tel" />
            </div>
          </Row>

          <div className={styles.submitRow}>
            <Button type="submit" property1="Default">Calculate ROI</Button>
          </div>
        </form>

        <div ref={resultsRef}>
          <ResultsPanel result={result} onGetReport={handleGetReport} />
        </div>
      </div>
    </section>
  );
}
