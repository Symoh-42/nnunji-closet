import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useForm, type Path, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "../../siteConfig";
import { services, eventTypes } from "@/data/content";
import { pieces, type Piece } from "@/data/pieces";
import { cn, formatDate, mailtoLink, todayIso, whatsappLink } from "@/lib/utils";

/* ---------- Primitives ---------- */

export function Field({
  label,
  error,
  hint,
  children,
  optional,
  id,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
  optional?: boolean;
  id?: string;
}) {
  const auto = useId();
  const fid = id ?? auto;
  const desc = [hint && `${fid}-hint`, error && `${fid}-err`].filter(Boolean).join(" ") || undefined;
  return (
    <div>
      <label htmlFor={fid} className="label">
        {label}
        {optional && <span className="ml-2 tracking-[0.1em] text-taupe normal-case">(optional)</span>}
      </label>
      {children({ id: fid, "aria-invalid": !!error, "aria-describedby": desc })}
      {hint && !error && (
        <p id={`${fid}-hint`} className="mt-2 text-xs text-taupe-deep">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${fid}-err`} className="mt-2 text-xs font-medium text-red-700" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Radio group styled as selectable chips. */
export function Chips({
  legend,
  options,
  reg,
  error,
  name,
}: {
  legend: string;
  options: string[];
  reg: UseFormRegisterReturn;
  error?: string;
  name: string;
}) {
  const id = useId();
  return (
    <fieldset aria-describedby={error ? `${id}-err` : undefined}>
      <legend className="label">{legend}</legend>
      <div className="mt-4 flex flex-wrap gap-2.5">
        {options.map((o) => (
          <label key={o} className="cursor-pointer">
            <input type="radio" value={o} {...reg} name={name} className="peer sr-only" />
            <span className="inline-flex min-h-11 items-center gap-2 border border-noir/20 px-4 text-[0.88rem] text-ink transition-colors peer-checked:border-noir peer-checked:bg-noir peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold hover:border-noir/60">
              {o}
            </span>
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-2 text-xs font-medium text-red-700" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function Consent({ reg, error }: { reg: UseFormRegisterReturn; error?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink/75">
        <input id={id} type="checkbox" {...reg} aria-invalid={!!error} className="mt-1 h-4 w-4 shrink-0 accent-[#0e0d0c]" />
        <span>
          I agree that {siteConfig.name} may use these details to respond to my request, as described in the{" "}
          <a href="/privacy" className="underline underline-offset-2 hover:text-gold-deep">privacy notice</a>.
        </span>
      </label>
      {error && <p className="mt-2 text-xs font-medium text-red-700" role="alert">{error}</p>}
    </div>
  );
}

/** Lists the fields with errors and takes focus so screen-reader users hear what to fix. */
/** Shown only after a submit/continue attempt (`attempt` > 0), so inline blur validation never steals focus. */
function ErrorSummary({ errors, labels, attempt }: { errors: object; labels: Record<string, string>; attempt: number }) {
  const keys = Object.keys(errors);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (attempt > 0) ref.current?.focus();
  }, [attempt]);
  if (!attempt || !keys.length) return null;
  return (
    <div ref={ref} tabIndex={-1} role="alert" className="border-l-2 border-red-700 bg-red-50 px-5 py-4 text-sm text-red-900 outline-none">
      <p className="font-medium">Please check {keys.length === 1 ? "one detail" : `${keys.length} details`}:</p>
      <ul className="mt-1 list-disc pl-5">
        {keys.map((k) => (
          <li key={k}>{labels[k] ?? k}</li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Shared contact schema ---------- */

const phoneRe = /^[+0-9 ()-]{7,20}$/;
const contactFields = {
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email address"),
  phone: z
    .string()
    .trim()
    .refine((v) => v === "" || phoneRe.test(v), "Please enter a valid phone number, e.g. 0712 345 678"),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm we may contact you" }) }),
};

function ContactBlock({
  register,
  errors,
  dark,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: (name: any) => UseFormRegisterReturn;
  errors: { name?: { message?: string }; email?: { message?: string }; phone?: { message?: string } };
  dark?: boolean;
}) {
  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <Field label="Full name" error={errors.name?.message}>
          {(p) => <input {...p} {...register("name")} autoComplete="name" className={cn("field", dark && "field-dark")} />}
        </Field>
      </div>
      <Field label="Email" error={errors.email?.message}>
        {(p) => <input {...p} {...register("email")} type="email" autoComplete="email" className={cn("field", dark && "field-dark")} />}
      </Field>
      <Field label="Phone or WhatsApp" optional error={errors.phone?.message}>
        {(p) => <input {...p} {...register("phone")} type="tel" autoComplete="tel" inputMode="tel" className={cn("field", dark && "field-dark")} />}
      </Field>
    </div>
  );
}

/* ---------- Confirmation ---------- */

function Confirmation({
  title,
  lines,
  subject,
  onReset,
}: {
  title: string;
  lines: [string, string][];
  subject: string;
  onReset: () => void;
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  useEffect(() => ref.current?.focus(), []);
  const body = lines.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
  return (
    <div className="page-enter" role="status">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-gold text-gold-deep">
        <Check className="h-6 w-6" strokeWidth={1.3} aria-hidden="true" />
      </span>
      <h3 ref={ref} tabIndex={-1} className="display-md mt-7 text-noir outline-none">{title}</h3>
      <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-ink/75">
        This website is a concept, so <strong className="font-medium">nothing has been sent yet</strong>. Your request is summarised below. You can send it directly to the atelier by email or WhatsApp.
      </p>
      <dl className="mt-8 divide-y divide-line border-y border-line">
        {lines.filter(([, v]) => v).map(([k, v]) => (
          <div key={k} className="grid gap-1 py-3.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
            <dt className="text-[0.64rem] font-medium tracking-[0.22em] text-taupe-deep uppercase">{k}</dt>
            <dd className="text-[0.95rem] whitespace-pre-line text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 flex flex-wrap gap-3">
        <a href={mailtoLink(subject, body)} className="btn btn-noir">
          <Mail className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
          <span>Send by email</span>
        </a>
        <a href={whatsappLink(`${subject}\n\n${body}`)} target="_blank" rel="noreferrer" className="btn btn-ghost">
          <MessageCircle className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
          <span>Send on WhatsApp</span>
        </a>
        <button type="button" onClick={onReset} className="link-line ml-2 text-noir">
          Start again
        </button>
      </div>
    </div>
  );
}

/* ---------- Consultation booking (stepped) ---------- */

const formats = ["In the Lavington atelier", "Virtual consultation", "At my home in Nairobi"];
const times = ["Morning", "Afternoon", "Early evening"];

const bookingSchema = z.object({
  eventType: z.string({ invalid_type_error: "Please choose what you are dressing for" }).min(1, "Please choose what you are dressing for"),
  service: z.string().min(1, "Please choose a service"),
  preferredDate: z
    .string()
    .min(1, "Please choose a preferred date")
    .refine((v) => v >= todayIso(), "Please choose a date from today onwards"),
  timeOfDay: z.string({ invalid_type_error: "Please choose a time of day" }).min(1, "Please choose a time of day"),
  eventDate: z.string().optional(),
  format: z.string({ invalid_type_error: "Please choose a format" }).min(1, "Please choose a format"),
  ...contactFields,
  contactPref: z.string(),
  notes: z.string().max(1200, "Please keep notes under 1,200 characters").optional(),
});
type Booking = z.infer<typeof bookingSchema>;

const bookingLabels: Record<string, string> = {
  eventType: "Occasion",
  service: "Service",
  preferredDate: "Preferred date",
  timeOfDay: "Time of day",
  format: "Consultation format",
  name: "Name",
  email: "Email",
  phone: "Phone",
  consent: "Consent",
  notes: "Style notes",
};

const steps: { title: string; fields: Path<Booking>[] }[] = [
  { title: "The occasion", fields: ["eventType", "service"] },
  { title: "Date & format", fields: ["preferredDate", "timeOfDay", "format", "eventDate"] },
  { title: "Your details", fields: ["name", "email", "phone", "contactPref", "notes", "consent"] },
];

export function ConsultationBooking({ defaultService }: { defaultService?: string }) {
  const [step, setStep] = useState(0);
  const [attempt, setAttempt] = useState(0);
  const [done, setDone] = useState<Booking | null>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  const {
    register,
    handleSubmit,
    trigger,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Booking>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: { service: defaultService ?? services[0].name, contactPref: "Email", notes: "", phone: "", eventDate: "" },
  });

  useEffect(() => {
    if (defaultService) setValue("service", defaultService);
  }, [defaultService, setValue]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headRef.current?.focus();
  }, [step]);

  const notes = watch("notes") ?? "";

  const next = async () => {
    if (await trigger(steps[step].fields)) {
      setAttempt(0);
      setStep((s) => Math.min(s + 1, steps.length - 1));
    } else setAttempt((a) => a + 1);
  };

  const onSubmit = async (data: Booking) => {
    await new Promise((r) => setTimeout(r, 600));
    setDone(data);
  };

  if (done)
    return (
      <Confirmation
        title="Your consultation request is ready"
        subject={`Styling consultation request: ${done.service}`}
        onReset={() => {
          reset();
          setStep(0);
          setDone(null);
        }}
        lines={[
          ["Service", done.service],
          ["Occasion", done.eventType],
          ["Preferred date", `${formatDate(done.preferredDate)}, ${done.timeOfDay.toLowerCase()}`],
          ["Event date", done.eventDate ? formatDate(done.eventDate) : ""],
          ["Format", done.format],
          ["Name", done.name],
          ["Email", done.email],
          ["Phone", done.phone],
          ["Preferred contact", done.contactPref],
          ["Style notes", done.notes ?? ""],
        ]}
      />
    );

  return (
    <form onSubmit={handleSubmit(onSubmit, () => setAttempt((a) => a + 1))} noValidate aria-label="Book a styling consultation">
      {/* Progress */}
      <ol className="grid grid-cols-3 gap-2" aria-label="Booking steps">
        {steps.map((s, i) => (
          <li key={s.title} aria-current={i === step ? "step" : undefined}>
            <span className={cn("block h-px transition-colors duration-500", i <= step ? "bg-noir" : "bg-noir/15")} />
            <span className={cn("mt-3 block text-[0.6rem] font-medium tracking-[0.22em] uppercase sm:text-[0.64rem]", i === step ? "text-noir" : "text-taupe")}>
              <span className="font-display text-sm tracking-normal">0{i + 1}</span> <span className="hidden sm:inline">{s.title}</span>
            </span>
          </li>
        ))}
      </ol>

      <h3 ref={headRef} tabIndex={-1} className="display-md mt-10 text-noir outline-none">
        <span className="sr-only">Step {step + 1} of 3: </span>
        {steps[step].title}
      </h3>

      <div className="mt-8">
        <ErrorSummary errors={Object.fromEntries(Object.entries(errors).filter(([k]) => steps[step].fields.includes(k as Path<Booking>)))} labels={bookingLabels} attempt={attempt} />
      </div>

      <div className="mt-6 space-y-9">
        {step === 0 && (
          <div key="s0" className="page-enter space-y-9">
            <Chips legend="What are you dressing for?" name="eventType" options={eventTypes} reg={register("eventType")} error={errors.eventType?.message} />
            <Field label="Service" error={errors.service?.message}>
              {(p) => (
                <select {...p} {...register("service")} className="field cursor-pointer">
                  {services.map((s) => (
                    <option key={s.slug}>{s.name}</option>
                  ))}
                </select>
              )}
            </Field>
          </div>
        )}

        {step === 1 && (
          <div key="s1" className="page-enter space-y-9">
            <div className="grid gap-8 sm:grid-cols-2">
              <Field label="Preferred consultation date" error={errors.preferredDate?.message} hint="The atelier will confirm availability.">
                {(p) => <input {...p} {...register("preferredDate")} type="date" min={todayIso()} className="field" />}
              </Field>
              <Field label="Date of your event" optional>
                {(p) => <input {...p} {...register("eventDate")} type="date" min={todayIso()} className="field" />}
              </Field>
            </div>
            <Chips legend="Preferred time of day" name="timeOfDay" options={times} reg={register("timeOfDay")} error={errors.timeOfDay?.message} />
            <Chips legend="Consultation format" name="format" options={formats} reg={register("format")} error={errors.format?.message} />
            <p className="-mt-4 text-xs text-taupe-deep">Formats and availability are to be confirmed by the atelier.</p>
          </div>
        )}

        {step === 2 && (
          <div key="s2" className="page-enter space-y-9">
            <ContactBlock register={register} errors={errors} />
            <Chips legend="Preferred contact method" name="contactPref" options={["Email", "Phone call", "WhatsApp"]} reg={register("contactPref")} />
            <Field label="Style notes" optional error={errors.notes?.message} hint={`Colours you love, references, fabrics, how you want to feel. ${notes.length}/1200`}>
              {(p) => <textarea {...p} {...register("notes")} rows={4} className="field resize-y" />}
            </Field>
            <Consent reg={register("consent")} error={errors.consent?.message} />
          </div>
        )}
      </div>

      <div className="mt-12 flex items-center justify-between gap-4 border-t border-line pt-8">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="link-line text-noir">
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Back
          </button>
        ) : (
          <span />
        )}
        {step < steps.length - 1 ? (
          <button type="button" onClick={next} className="btn btn-noir">
            <span>Continue</span>
            <ArrowRight className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
          </button>
        ) : (
          <button type="submit" disabled={isSubmitting} className="btn btn-gold disabled:opacity-60">
            <span>{isSubmitting ? "Preparing..." : "Request Consultation"}</span>
          </button>
        )}
      </div>
    </form>
  );
}

/* ---------- Request a piece ---------- */

const measureOptions = ["Measure me at the atelier", "I will share my measurements", "Not sure yet"];

export function PieceRequestForm({ piece }: { piece: Piece }) {
  const schema = z.object({
    choices: z.record(z.string()),
    occasion: z.string().min(1, "Please choose an occasion"),
    neededBy: z
      .string()
      .optional()
      .refine((v) => !v || v >= todayIso(), "Please choose a date from today onwards"),
    measurements: z.string({ invalid_type_error: "Please choose an option" }).min(1, "Please choose an option"),
    ...contactFields,
    notes: z.string().max(1200, "Please keep notes under 1,200 characters").optional(),
  });
  type Req = z.infer<typeof schema>;
  const [done, setDone] = useState<Req | null>(null);
  const [attempt, setAttempt] = useState(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Req>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      choices: Object.fromEntries(piece.customisation.map((c) => [c.label, c.options[0]])),
      occasion: "",
      phone: "",
      notes: "",
      neededBy: "",
    },
  });

  if (done)
    return (
      <Confirmation
        title="Your request is ready to send"
        subject={`Bespoke piece request: ${piece.name}`}
        onReset={() => {
          reset();
          setDone(null);
        }}
        lines={[
          ["Piece", piece.name],
          ...piece.customisation.map((c) => [c.label, done.choices[c.label] ?? ""] as [string, string]),
          ["Occasion", done.occasion],
          ["Needed by", done.neededBy ? formatDate(done.neededBy) : ""],
          ["Measurements", done.measurements],
          ["Name", done.name],
          ["Email", done.email],
          ["Phone", done.phone],
          ["Notes", done.notes ?? ""],
        ]}
      />
    );

  return (
    <form
      onSubmit={handleSubmit(
        async (d) => {
          await new Promise((r) => setTimeout(r, 600));
          setDone(d);
        },
        () => setAttempt((a) => a + 1),
      )}
      noValidate
      aria-label={`Request ${piece.name}`}
      className="space-y-9"
    >
      <ErrorSummary errors={errors} labels={{ occasion: "Occasion", neededBy: "Date needed", measurements: "Measurements", name: "Name", email: "Email", phone: "Phone", consent: "Consent", notes: "Notes" }} attempt={attempt} />
      <fieldset>
        <legend className="label">Your customisation</legend>
        <div className="mt-2 grid gap-8 sm:grid-cols-3">
          {piece.customisation.map((c) => (
            <Field key={c.label} label={c.label}>
              {(p) => (
                <select {...p} {...register(`choices.${c.label}` as const)} className="field cursor-pointer">
                  {c.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              )}
            </Field>
          ))}
        </div>
      </fieldset>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field label="Occasion" error={errors.occasion?.message}>
          {(p) => (
            <select {...p} {...register("occasion")} className="field cursor-pointer">
              <option value="">Choose an occasion</option>
              {eventTypes.map((e) => (
                <option key={e}>{e}</option>
              ))}
            </select>
          )}
        </Field>
        <Field label="Date you need it by" optional error={errors.neededBy?.message}>
          {(p) => <input {...p} {...register("neededBy")} type="date" min={todayIso()} className="field" />}
        </Field>
      </div>
      <Chips legend="Measurements" name="measurements" options={measureOptions} reg={register("measurements")} error={errors.measurements?.message} />
      <ContactBlock register={register} errors={errors} />
      <Field label="Anything else we should know?" optional error={errors.notes?.message} hint="Colour ideas, fabric you already own, references.">
        {(p) => <textarea {...p} {...register("notes")} rows={3} className="field resize-y" />}
      </Field>
      <Consent reg={register("consent")} error={errors.consent?.message} />
      <div className="flex flex-wrap items-center gap-5 pt-2">
        <button type="submit" disabled={isSubmitting} className="btn btn-gold disabled:opacity-60">
          <span>{isSubmitting ? "Preparing..." : "Request This Piece"}</span>
        </button>
        <p className="text-xs text-taupe-deep">No payment is taken. Pricing is discussed after your consultation.</p>
      </div>
    </form>
  );
}

/* ---------- General enquiry ---------- */

const enquiryTypes = ["A bespoke piece", "Personal styling", "Wardrobe makeover", "Collaboration or press", "Something else"];

const enquirySchema = z.object({
  type: z.string({ invalid_type_error: "Please choose a topic" }).min(1, "Please choose a topic"),
  piece: z.string().optional(),
  ...contactFields,
  message: z.string().trim().min(10, "Please tell us a little more (at least 10 characters)").max(2000, "Please keep your message under 2,000 characters"),
});
type Enquiry = z.infer<typeof enquirySchema>;

export function EnquiryForm({ pieceSlug }: { pieceSlug?: string }) {
  const [done, setDone] = useState<Enquiry | null>(null);
  const [attempt, setAttempt] = useState(0);
  const initialPiece = pieces.find((p) => p.slug === pieceSlug)?.name ?? "";
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Enquiry>({
    resolver: zodResolver(enquirySchema),
    mode: "onTouched",
    defaultValues: { type: initialPiece ? "A bespoke piece" : undefined, piece: initialPiece, phone: "", message: "" },
  });

  if (done)
    return (
      <Confirmation
        title="Thank you. Your enquiry is ready"
        subject={`Website enquiry: ${done.type}`}
        onReset={() => {
          reset();
          setDone(null);
        }}
        lines={[
          ["Topic", done.type],
          ["Piece", done.piece ?? ""],
          ["Name", done.name],
          ["Email", done.email],
          ["Phone", done.phone],
          ["Message", done.message],
        ]}
      />
    );

  return (
    <form
      onSubmit={handleSubmit(
        async (d) => {
          await new Promise((r) => setTimeout(r, 600));
          setDone(d);
        },
        () => setAttempt((a) => a + 1),
      )}
      noValidate
      aria-label="General enquiry"
      className="space-y-9"
    >
      <ErrorSummary errors={errors} labels={{ type: "Topic", name: "Name", email: "Email", phone: "Phone", consent: "Consent", message: "Message" }} attempt={attempt} />
      <Chips legend="What is your enquiry about?" name="type" options={enquiryTypes} reg={register("type")} error={errors.type?.message} />
      <Field label="Piece of interest" optional>
        {(p) => (
          <select {...p} {...register("piece")} className="field cursor-pointer">
            <option value="">None in particular</option>
            {pieces.map((pc) => (
              <option key={pc.slug}>{pc.name}</option>
            ))}
          </select>
        )}
      </Field>
      <ContactBlock register={register} errors={errors} />
      <Field label="Your message" error={errors.message?.message}>
        {(p) => <textarea {...p} {...register("message")} rows={5} className="field resize-y" />}
      </Field>
      <Consent reg={register("consent")} error={errors.consent?.message} />
      <button type="submit" disabled={isSubmitting} className="btn btn-noir disabled:opacity-60">
        <span>{isSubmitting ? "Preparing..." : "Send Enquiry"}</span>
      </button>
    </form>
  );
}
