import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Minus, Plus, ChevronDown, Check } from 'lucide-react';

type PlanInfo = {
  name: string;
  monthly: number;
  yearly: number; // monthly * 11 (1 month free)
  setup: number;
  /** Users + phone lines included in the plan — used for dynamic add-on copy */
  includedUsers: number;
};

type AddOn = {
  key: string;
  title: string;
  price: number;
  unit: string;
  /** Description can use {includedUsers} as a placeholder */
  description: string;
  more?: string;
};

/**
 * Verified add-ons from alive5.com checkout flow.
 * Order matches the live UI: Live Chat User → SMS User → Voice to Text.
 */
const ADDONS: AddOn[] = [
  {
    key: 'extra-livechat-user',
    title: 'Additional Live Chat User',
    price: 20,
    unit: '/mo each',
    description:
      'Enable ability to add a chat widget on your website (similar to the demo widget in the bottom right of Alive5.com).',
    more: 'Each Live Chat user license includes the ability to host a real-time chat widget on your site, with conversation routing, transcripts, and the same team inbox you use for SMS.',
  },
  {
    key: 'extra-sms-user',
    title: 'Additional SMS User',
    price: 10,
    unit: '/mo each',
    description: 'Includes {includedUsers} in plan. Each user has a unique email login to access Alive5.',
    more: 'Additional SMS users can chat, text, and manage their own threads inside the team inbox. Useful when your shift adds more concurrent agents than your plan covers.',
  },
  {
    key: 'voice-to-text',
    title: 'Voice to Text Feature',
    price: 50,
    unit: '/mo each line',
    description: 'Send a text to a customer when your phone line is unanswered…',
    more: 'When a call rings out, Alive5 auto-sends an SMS to the missed caller so the conversation continues in text. Configured per phone line.',
  },
];

type Cycle = 'monthly' | 'yearly';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  plan: PlanInfo;
  cycle: Cycle;
}

export function CheckoutModal({ open, onClose, plan, cycle }: CheckoutModalProps) {
  const [step, setStep] = useState(1);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    accountName: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Reset state every time modal opens fresh
  useEffect(() => {
    if (open) {
      setStep(1);
      setQty({});
      setForm({ firstName: '', lastName: '', email: '', company: '', accountName: '' });
      setSubmitted(false);
    }
  }, [open, plan.name]);

  // ESC to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Pricing math
  const basePerMonth = plan.monthly;
  const baseDisplay = cycle === 'yearly' ? plan.yearly : plan.monthly;
  const baseUnit = cycle === 'yearly' ? '/yr' : '/mo';

  const addonsRecurringPerMonth = ADDONS.reduce((sum, a) => sum + (qty[a.key] || 0) * a.price, 0);
  const recurringPerMonth = basePerMonth + addonsRecurringPerMonth;
  const recurringDisplay = cycle === 'yearly' ? recurringPerMonth * 11 : recurringPerMonth;
  const dueNow = recurringDisplay + plan.setup;

  const fmt = (n: number) => `$${n.toLocaleString('en-US')}`;

  // Per-field validation — used both to disable Next and to render inline errors
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim());
  const accountNameOk = form.accountName.trim().length >= 3;
  const errors = {
    firstName: form.firstName.trim() ? '' : 'Required',
    lastName: form.lastName.trim() ? '' : 'Required',
    email: !form.email.trim()
      ? 'Required'
      : !emailOk
        ? 'Please enter a valid email (e.g. you@company.com)'
        : '',
    company: form.company.trim() ? '' : 'Required',
    accountName: !form.accountName.trim()
      ? 'Required'
      : !accountNameOk
        ? 'At least 3 characters'
        : '',
  };
  const validStep3 = Object.values(errors).every((e) => !e);

  // Track whether user attempted to advance — controls when inline errors appear
  const [showErrors, setShowErrors] = useState(false);

  function next() {
    if (step < 3) {
      setStep((s) => s + 1);
      return;
    }
    if (!validStep3) {
      setShowErrors(true);
      return;
    }
    setSubmitted(true);
  }
  function back() {
    if (step > 1) setStep((s) => s - 1);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-grey-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="checkout-title"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-grey-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* close */}
              <button
                onClick={onClose}
                aria-label="Close checkout"
                className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full text-grey-500 transition-colors hover:bg-grey-100 hover:text-grey-900 dark:hover:bg-white/10 dark:hover:text-white"
              >
                <X className="size-4" />
              </button>

              {/* Step indicator pills */}
              {!submitted && (
                <div className="flex items-center gap-1.5 px-7 pt-7">
                  {[1, 2, 3].map((s) => (
                    <span
                      key={s}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        s <= step ? 'bg-alive5-orange' : 'bg-grey-200'
                      }`}
                    />
                  ))}
                </div>
              )}

              <div className="max-h-[80vh] overflow-y-auto p-7 pt-5">
                {/* === SUCCESS === */}
                {submitted ? (
                  <div className="py-8 text-center">
                    <span className="inline-flex size-14 items-center justify-center rounded-full bg-accent-green/15 text-accent-green ring-1 ring-accent-green/30">
                      <Check className="size-7" strokeWidth={3} />
                    </span>
                    <h2 className="mt-5 text-h3 font-bold text-grey-900">You're in 🎉</h2>
                    <p className="mt-3 text-body text-grey-700">
                      A welcome email is on its way to{' '}
                      <span className="font-semibold text-grey-900">{form.email}</span>.
                      <br />
                      Our team will reach out within 1 business day to finish setting up{' '}
                      <span className="font-semibold text-alive5-orange">{plan.name}</span> for{' '}
                      <span className="font-semibold">{form.company}</span>.
                    </p>
                    <button
                      onClick={onClose}
                      className="mt-7 inline-flex items-center gap-2 rounded-xl bg-alive5-orange px-6 py-3 text-small font-semibold text-white shadow-orange transition-transform hover:-translate-y-0.5"
                    >
                      Done
                    </button>
                  </div>
                ) : (
                  <>
                    {/* === STEP 1: Plan Summary === */}
                    {step === 1 && (
                      <StepBlock
                        eyebrow="Step 1 of 3"
                        title="Plan Summary"
                        subtitle={`${plan.name.toUpperCase()} plan selected. Review your totals before choosing add-ons.`}
                      >
                        <SummaryRows
                          rows={[
                            { label: 'Base plan', value: `${fmt(baseDisplay)}${baseUnit}` },
                            { label: 'Add-ons', value: '$0' },
                            { label: 'One-time setup', value: fmt(plan.setup) },
                          ]}
                          totals={[
                            { label: 'Due now', value: fmt(dueNow), strong: true },
                            { label: 'Total recurring', value: `${fmt(recurringDisplay)}${baseUnit}` },
                          ]}
                        />
                      </StepBlock>
                    )}

                    {/* === STEP 2: Add-ons === */}
                    {step === 2 && (
                      <StepBlock
                        eyebrow="Step 2 of 3"
                        title="Available Add-ons"
                        subtitle={`Choose optional extras for ${plan.name.toUpperCase()}.`}
                      >
                        <SummaryRows
                          rows={[]}
                          totals={[
                            { label: 'Due now', value: fmt(dueNow) },
                            { label: 'Total recurring', value: `${fmt(recurringDisplay)}${baseUnit}`, strong: true },
                          ]}
                        />

                        <div className="mt-4 space-y-3">
                          {ADDONS.map((a) => (
                            <AddonRow
                              key={a.key}
                              addon={{
                                ...a,
                                description: a.description.replace(
                                  '{includedUsers}',
                                  String(plan.includedUsers),
                                ),
                              }}
                              qty={qty[a.key] || 0}
                              onChange={(q) =>
                                setQty((prev) => ({ ...prev, [a.key]: Math.max(0, q) }))
                              }
                            />
                          ))}
                        </div>
                      </StepBlock>
                    )}

                    {/* === STEP 3: Contact === */}
                    {step === 3 && (
                      <StepBlock
                        eyebrow="Step 3 of 3"
                        title="Contact Details"
                        subtitle="Please provide your details to continue with checkout."
                      >
                        <div className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-small text-grey-700 dark:border-orange-700/40 dark:bg-orange-950/30 dark:text-grey-300">
                          <span className="font-semibold text-grey-900">{plan.name.toUpperCase()}</span>{' '}
                          selected. You can review or edit optional add-ons before checkout.
                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <Field
                            label="First Name"
                            required
                            placeholder="Jane"
                            value={form.firstName}
                            onChange={(v) => setForm((f) => ({ ...f, firstName: v }))}
                            error={showErrors ? errors.firstName : ''}
                          />
                          <Field
                            label="Last Name"
                            required
                            placeholder="Doe"
                            value={form.lastName}
                            onChange={(v) => setForm((f) => ({ ...f, lastName: v }))}
                            error={showErrors ? errors.lastName : ''}
                          />
                          <div className="sm:col-span-2">
                            <Field
                              label="Email Address"
                              required
                              type="email"
                              placeholder="you@company.com"
                              value={form.email}
                              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                              error={showErrors ? errors.email : form.email && !emailOk ? errors.email : ''}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <Field
                              label="Company Name"
                              required
                              placeholder="Acme Inc."
                              value={form.company}
                              onChange={(v) => setForm((f) => ({ ...f, company: v }))}
                              error={showErrors ? errors.company : ''}
                            />
                          </div>
                          <div className="sm:col-span-2">
                            <Field
                              label="Account Name (Unique org name in Alive5)"
                              required
                              placeholder="acme"
                              value={form.accountName}
                              onChange={(v) =>
                                setForm((f) => ({
                                  ...f,
                                  accountName: v.replace(/\s+/g, '-').toLowerCase(),
                                }))
                              }
                              hint={accountNameOk ? 'Account name is available.' : undefined}
                              error={showErrors ? errors.accountName : ''}
                            />
                          </div>
                        </div>

                        {showErrors && !validStep3 && (
                          <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-small font-medium text-red-700 ring-1 ring-red-200">
                            Please fix the highlighted fields to continue.
                          </p>
                        )}
                      </StepBlock>
                    )}

                    {/* === Footer actions === */}
                    <div className="mt-7 flex items-center justify-end gap-3">
                      {step === 1 ? (
                        <button
                          onClick={onClose}
                          className="rounded-xl bg-grey-100 px-5 py-3 text-small font-semibold text-grey-700 transition-colors hover:bg-grey-200 dark:bg-white/10 dark:text-grey-200 dark:hover:bg-white/20"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          onClick={back}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-grey-100 px-5 py-3 text-small font-semibold text-grey-700 transition-colors hover:bg-grey-200"
                        >
                          <ArrowLeft className="size-4" />
                          Back
                        </button>
                      )}
                      <button
                        onClick={next}
                        className="group inline-flex items-center gap-1.5 rounded-xl bg-alive5-orange px-6 py-3 text-small font-semibold text-white shadow-orange transition-all hover:-translate-y-0.5"
                      >
                        {step === 3 ? 'Continue' : 'Next'}
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ---------------------------------------------------------------- */

function StepBlock({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-legal font-semibold uppercase tracking-[0.15em] text-alive5-orange">
        {eyebrow}
      </p>
      <h2 id="checkout-title" className="mt-1 text-h3 font-bold text-grey-900">
        {title}
      </h2>
      <p className="mt-2 text-small text-grey-600">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function SummaryRows({
  rows,
  totals,
}: {
  rows: { label: string; value: string }[];
  totals: { label: string; value: string; strong?: boolean }[];
}) {
  return (
    <div className="overflow-hidden rounded-xl bg-orange-50/60 ring-1 ring-orange-100 dark:bg-orange-950/30 dark:ring-orange-800/30">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={`flex items-center justify-between px-4 py-3 text-small text-grey-700 ${
            i > 0 ? 'border-t border-orange-100/70' : ''
          }`}
        >
          <span>{r.label}</span>
          <span className="font-medium text-grey-900">{r.value}</span>
        </div>
      ))}
      <div className="border-t border-orange-200/80 bg-white dark:border-orange-800/40 dark:bg-grey-900/40">
        {totals.map((t, i) => (
          <div
            key={t.label}
            className={`flex items-center justify-between px-4 py-3 ${
              i > 0 ? 'border-t border-grey-100' : ''
            } ${t.strong ? 'text-body font-bold text-grey-900' : 'text-small text-grey-800'}`}
          >
            <span>{t.label}</span>
            <span>{t.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddonRow({
  addon,
  qty,
  onChange,
}: {
  addon: AddOn;
  qty: number;
  onChange: (q: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const lineTotal = qty * addon.price;
  return (
    <div className="rounded-xl border border-grey-200 bg-white p-4 dark:bg-grey-900/40">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <p className="text-body font-semibold text-grey-900">{addon.title}</p>
          <p className="text-legal text-alive5-orange">
            ${addon.price}
            {addon.unit}
          </p>
          <p className="mt-1 text-small text-grey-700">{addon.description}</p>
          {addon.more && (
            <>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-1 inline-flex items-center gap-1 text-legal font-semibold text-alive5-orange hover:underline"
              >
                {expanded ? 'Show less' : 'Show more'}
                <ChevronDown
                  className={`size-3 transition-transform ${expanded ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-2 overflow-hidden text-small text-grey-600"
                  >
                    {addon.more}
                  </motion.p>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
        <span className="text-body font-bold text-grey-900">
          ${lineTotal.toLocaleString('en-US')}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-grey-100 pt-3">
        <span className="text-small font-medium text-grey-700">Quantity</span>
        <div className="inline-flex items-center rounded-lg ring-1 ring-grey-200">
          <button
            onClick={() => onChange(qty - 1)}
            aria-label="Decrease quantity"
            className="inline-flex size-9 items-center justify-center text-grey-700 transition-colors hover:bg-grey-50 disabled:opacity-40 dark:text-grey-200 dark:hover:bg-white/5"
            disabled={qty === 0}
          >
            <Minus className="size-4" />
          </button>
          <input
            value={qty}
            onChange={(e) => {
              const n = parseInt(e.target.value, 10);
              onChange(Number.isFinite(n) ? n : 0);
            }}
            inputMode="numeric"
            className="w-12 border-x border-grey-200 bg-transparent py-1.5 text-center text-small font-semibold text-grey-900 focus:outline-none dark:text-white"
          />
          <button
            onClick={() => onChange(qty + 1)}
            aria-label="Increase quantity"
            className="inline-flex size-9 items-center justify-center text-grey-700 transition-colors hover:bg-grey-50 dark:text-grey-200 dark:hover:bg-white/5"
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  type = 'text',
  value,
  onChange,
  hint,
  error,
  placeholder,
}: {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
  error?: string;
  placeholder?: string;
}) {
  const hasError = Boolean(error);
  return (
    <label className="block">
      <span className="text-small font-semibold text-grey-800">
        {label} {required && <span className="text-alive5-orange">*</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        aria-invalid={hasError}
        className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-3 text-small text-grey-900 transition-colors placeholder:text-grey-400 focus:outline-none focus:ring-2 dark:bg-grey-900/60 dark:text-white ${
          hasError
            ? 'border-red-400 bg-red-50/40 focus:border-red-500 focus:ring-red-200'
            : 'border-grey-200 focus:border-alive5-orange focus:ring-alive5-orange/20'
        }`}
      />
      {hasError ? (
        <p className="mt-1 text-legal font-medium text-red-600">{error}</p>
      ) : (
        hint && <p className="mt-1 text-legal text-accent-green">{hint}</p>
      )}
    </label>
  );
}
