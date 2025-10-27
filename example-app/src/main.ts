import './style.css';
import { AgeSignals, ErrorCode, UserStatus } from '@capgo/capacitor-android-age-signals';

const checkButton = document.getElementById('check-age-signals') as HTMLButtonElement;
const clearButton = document.getElementById('clear') as HTMLButtonElement;
const statusPill = document.getElementById('status-pill') as HTMLSpanElement;
const ageRange = document.getElementById('age-range') as HTMLParagraphElement;
const approvalDate = document.getElementById('approval-date') as HTMLParagraphElement;
const lastChecked = document.getElementById('last-checked') as HTMLParagraphElement;
const resultPre = document.getElementById('result') as HTMLPreElement;
const errorBlock = document.getElementById('error') as HTMLParagraphElement;

const statusClassMap: Record<UserStatus, string> = {
  [UserStatus.Verified]: 'verified',
  [UserStatus.Supervised]: 'supervised',
  [UserStatus.SupervisedApprovalPending]: 'pending',
  [UserStatus.SupervisedApprovalDenied]: 'pending',
  [UserStatus.Unknown]: 'unknown',
  [UserStatus.Empty]: 'unknown',
};

function resetUI() {
  statusPill.textContent = 'Unknown';
  statusPill.className = 'status-pill unknown';
  ageRange.textContent = 'No data yet';
  approvalDate.textContent = 'No approval timestamp';
  lastChecked.textContent = 'Not checked yet';
  resultPre.textContent = 'Run a check to view the raw payload.';
  resultPre.classList.add('empty');
  errorBlock.hidden = true;
  errorBlock.textContent = '';
}

function formatAgeRange(lower?: number, upper?: number) {
  if (typeof lower !== 'number' && typeof upper !== 'number') {
    return '—';
  }

  if (typeof lower === 'number' && typeof upper === 'number') {
    return `${lower}-${upper}`;
  }

  if (typeof lower === 'number') {
    return `${lower}+`;
  }

  return `≤ ${upper}`;
}

async function handleCheck() {
  checkButton.disabled = true;
  checkButton.textContent = 'Checking…';
  errorBlock.hidden = true;

  try {
    const result = await AgeSignals.checkAgeSignals();
    const { userStatus, ageLower, ageUpper, mostRecentApprovalDate, installId } = result;

    const className = statusClassMap[userStatus] ?? 'unknown';
    statusPill.className = `status-pill ${className}`;
    statusPill.textContent = userStatus.replace(/_/g, ' ');

    ageRange.textContent = formatAgeRange(ageLower, ageUpper);
    approvalDate.textContent = mostRecentApprovalDate ?? 'No approval timestamp';
    lastChecked.textContent = `Last checked ${new Date().toLocaleTimeString()}`;

    resultPre.textContent = JSON.stringify(result, null, 2);
    resultPre.classList.remove('empty');

    if (installId) {
      resultPre.textContent += `\n\nInstall ID: ${installId}`;
    }
  } catch (error) {
    const err = error as { message?: string; code?: ErrorCode };
    statusPill.className = 'status-pill error';
    statusPill.textContent = 'Error';
    errorBlock.hidden = false;
    errorBlock.textContent = `(${err.code ?? 'UNKNOWN'}) ${err.message ?? 'Failed to fetch age signals.'}`;
    resultPre.classList.add('empty');
  } finally {
    checkButton.disabled = false;
    checkButton.textContent = 'Check Age Signals';
  }
}

resetUI();

checkButton?.addEventListener('click', handleCheck);
clearButton?.addEventListener('click', resetUI);
