/* Cost model ported from the client-supplied ROI calculator. All monetary
   values are in INR; percentages in SPARES/AMC are plain numbers (10 = 10%). */

export const VEHICLES = {
  TUGG: [
    { id: 'AMR50', label: 'AMR 50', capacity: '5000 KG Payload Capacity', manualUnit: 685000, amrUnit: 2550000 },
    { id: 'AMR10', label: 'AMR 10', capacity: '1000 KG Payload Capacity', manualUnit: 350000, amrUnit: 1200000 },
  ],
  LIFT: [
    { id: 'APT', label: 'APT', capacity: '2000 KG Lift Capacity', manualUnit: 500000, amrUnit: 1800000 },
  ],
};

const LABOUR = {
  operatorMonthlyCTC: 28642,
  supervisors: 2,
  supervisorAnnual: 1200000,
  supervisorRaiseY4: 0.08,
  supportExec: 2,
};

const INSTALL_PCT = 2.5;

const SPARES = {
  manual: [0, 0, 3, 4, 5, 6, 6, 7],
  amr: [0, 0, 1.5, 1.5, 2, 2, 2, 2.5],
};

const AMC = {
  manual: [0, 0, 8, 8, 9, 9, 10, 10],
  amr: [0, 0, 6, 6, 7, 7, 7, 8],
};

const SETTINGS = {
  years: 7,
  wageIncrease: 0.1,
  adminPct: 0.05,
  shiftMult: { 1: 1.28, 2: 2.56, 3: 3.84 },
};

/** Runs the 7-year manual-vs-AMR cost projection for the given inputs. */
export function runCalc({ opType, vehicle, fleet, operators, shifts }) {
  const vehicleObj = (VEHICLES[opType] || []).find((v) => v.id === vehicle) || {};
  const { manualUnit, amrUnit } = vehicleObj;
  const mult = SETTINGS.shiftMult[shifts];
  const headcount = Math.ceil((operators + LABOUR.supportExec) * mult);
  const installPct = INSTALL_PCT / 100;

  let manualTotal = 0;
  let amrTotal = 0;
  let cumManual = 0;
  let cumAmr = 0;
  let paybackMonths = null;
  const rows = [];

  for (let y = 1; y <= SETTINGS.years; y++) {
    const labourCost = LABOUR.operatorMonthlyCTC * headcount * 12 * (1 + SETTINGS.wageIncrease) ** (y - 1);
    const mAdmin = labourCost * SETTINGS.adminPct;
    const mCapex = y === 1 ? fleet * manualUnit : 0;
    const mSpares = y === 1 ? 0 : fleet * manualUnit * (SPARES.manual[y] / 100);
    const mAmc = y === 1 ? 0 : fleet * manualUnit * (AMC.manual[y] / 100);
    const manualYear = mCapex + labourCost + mAdmin + mSpares + mAmc;

    const supCost = y < 4
      ? LABOUR.supervisors * LABOUR.supervisorAnnual
      : LABOUR.supervisors * LABOUR.supervisorAnnual * (1 + LABOUR.supervisorRaiseY4);
    const aAdmin = supCost * SETTINGS.adminPct;
    const aCapex = y === 1 ? fleet * amrUnit : 0;
    const aInstall = y === 1 ? fleet * amrUnit * installPct : 0;
    const aSpares = y === 1 ? 0 : fleet * amrUnit * (SPARES.amr[y] / 100);
    const aAmc = y === 1 ? 0 : fleet * amrUnit * (AMC.amr[y] / 100);
    const amrYear = aCapex + aInstall + supCost + aAdmin + aSpares + aAmc;

    manualTotal += manualYear;
    amrTotal += amrYear;

    if (paybackMonths === null) {
      const prevM = cumManual;
      const prevA = cumAmr;
      cumManual += manualYear;
      cumAmr += amrYear;
      if (cumManual >= cumAmr) {
        const mM = manualYear / 12;
        const aM = amrYear / 12;
        let rM = prevM;
        let rA = prevA;
        for (let mo = 1; mo <= 12; mo++) {
          rM += mM;
          rA += aM;
          if (rM >= rA) {
            paybackMonths = (y - 1) * 12 + mo;
            break;
          }
        }
        if (paybackMonths === null) paybackMonths = y * 12;
      }
    } else {
      cumManual += manualYear;
      cumAmr += amrYear;
    }

    rows.push({ y, manualYear, amrYear, cumManual, cumAmr });
  }

  const savings = manualTotal - amrTotal;
  const pct = manualTotal > 0 ? (savings / manualTotal) * 100 : 0;

  return { rows, manualTotal, amrTotal, savings, pct, paybackMonths, headcount };
}
