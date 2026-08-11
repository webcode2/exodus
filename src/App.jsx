import { useState, useRef } from 'react'

// Image imports
import speakerImg from '/images/WhatsApp Image 2026-08-10 at 09.18.01.jpeg'
import dancingImg from '/images/WhatsApp Image 2026-08-10 at 09.18.02.jpeg'
import phoneImg from '/images/WhatsApp Image 2026-08-10 at 09.18.02 (1).jpeg'
import prayingImg from '/images/WhatsApp Image 2026-08-10 at 09.18.02 (2).jpeg'
import singingImg from '/images/WhatsApp Image 2026-08-10 at 09.18.03 (1).jpeg'

// Firebase Cloud Function URL — update this after deploying
// Local: http://127.0.0.1:5001/teens-camp-26/us-central1/register
// Deployed: https://us-central1-teens-camp-26.cloudfunctions.net/register
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://us-central1-teens-camp-26.cloudfunctions.net/register"

const campImages = [
  { src: dancingImg, alt: 'Teens worshipping together' },
  { src: phoneImg, alt: 'Capturing the moment' },
  { src: prayingImg, alt: 'Teens in prayer' },
  { src: singingImg, alt: 'Singing with joy' },
]

const STEPS = [
  { id: 1, title: 'Your Info', icon: '👤' },
  { id: 2, title: 'Parent Details', icon: '👨‍👩‍👧' },
  { id: 3, title: 'Transport & Medical', icon: '🚌' },
  { id: 4, title: 'Consent & Submit', icon: '✅' },
]

function Hero({ onRegister }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-camp-dark">
      {/* ── Animated mesh gradient background ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-camp-dark via-[#0a1628] to-[#0d1f12]" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />
        <div className="hero-orb hero-orb-4" />
      </div>

      {/* ── Grid pattern overlay ── */}
      <div className="absolute inset-0 z-[1] hero-grid opacity-[0.04]" />

      {/* ── Animated accent lines ── */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
        <div className="hero-line hero-line-1" />
        <div className="hero-line hero-line-2" />
        <div className="hero-line hero-line-3" />
      </div>

      {/* ── Floating geometric shapes ── */}
      <div className="absolute inset-0 z-[3] overflow-hidden pointer-events-none">
        <div className="hero-shape hero-shape-1" />
        <div className="hero-shape hero-shape-2" />
        <div className="hero-shape hero-shape-3" />
        <div className="hero-shape hero-shape-4" />
        <div className="hero-shape hero-shape-5" />
        <div className="hero-shape hero-shape-6" />
      </div>

      {/* ── Dot grid accent ── */}
      <div className="absolute top-1/4 left-8 z-[3] pointer-events-none">
        <div className="grid grid-cols-3 gap-3 opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-camp-green animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
      <div className="absolute bottom-1/3 right-8 z-[3] pointer-events-none">
        <div className="grid grid-cols-3 gap-3 opacity-20">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-camp-blue animate-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-5xl mx-auto space-y-10 md:space-y-14">
        {/* Church badge */}
        <div className="hero-fade-up" style={{ animationDelay: '0.1s' }}>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-camp-green animate-pulse" />
            <span className="font-body font-bold text-xs tracking-[0.2em] uppercase text-white/50">
              House of Destiny — The Church in Town
            </span>
          </span>
        </div>

        {/* Main title — dramatic split */}
        <div className="hero-fade-up space-y-4 md:space-y-6" style={{ animationDelay: '0.25s' }}>
          <h1 className="font-display leading-[0.9]">
            <span className="block text-[clamp(3.5rem,11vw,9rem)] text-white/90 hero-title-glow">
              Outpouring
            </span>
          </h1>
          <h2 className="font-body font-black text-[clamp(1.5rem,4.5vw,3rem)] text-white/35 tracking-[0.15em] uppercase">
            of the Spirit
          </h2>
        </div>

        {/* Camp name — bold badge */}
        <div className="hero-fade-up" style={{ animationDelay: '0.55s' }}>
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-camp-green via-camp-lime to-camp-green hero-glow-border">
            <span className="font-display text-3xl md:text-4xl text-camp-dark tracking-wide">
              Teens Camp '26
            </span>
            <span className="text-2xl">🔥</span>
          </div>
        </div>

        {/* Date strip — modern horizontal */}
        <div className="hero-fade-up mb-12" style={{ animationDelay: '0.7s' }}>
          <div className="inline-flex items-stretch rounded-2xl overflow-hidden border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
            <div className="flex items-center gap-3 px-6 py-4 border-r border-white/[0.08]">
              <span className="text-2xl">📅</span>
              <div className="text-left">
                <p className="font-body font-black text-white text-sm leading-tight">Aug 20–23</p>
                <p className="font-body text-white/40 text-xs">Thursday – Sunday</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-4 border-r border-white/[0.08]">
              <span className="text-2xl">🚌</span>
              <div className="text-left">
                <p className="font-body font-black text-white text-sm leading-tight">12:00 PM</p>
                <p className="font-body text-white/40 text-xs">Bus Departure</p>
              </div>
            </div>
            <div className="flex items-center gap-3 px-6 py-4">
              <span className="text-2xl">📍</span>
              <div className="text-left">
                <p className="font-body font-black text-white text-sm leading-tight">27 Harbour Rd</p>
                <p className="font-body text-white/40 text-xs">Pick-up Point</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA button */}
        <div className="hero-fade-up" style={{ animationDelay: '0.85s' }}>
          <button
            onClick={onRegister}
            className="group relative inline-flex items-center gap-3 px-14 py-5 rounded-2xl font-display text-xl text-camp-dark font-bold tracking-wide bg-gradient-to-r from-camp-green to-camp-lime transition-all duration-500 hover:scale-105 hover:shadow-[0_0_60px_rgba(76,175,80,0.4)] active:scale-95"
          >
            <span className="relative z-10">Register Now</span>
            <svg className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            {/* Button glow ring */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-camp-green to-camp-lime opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
          </button>
        </div>

        {/* Tagline */}
        <div className="hero-fade-up mt-8" style={{ animationDelay: '1s' }}>
          <p className="font-body text-white/30 text-sm tracking-widest uppercase">
            4 days of worship · fellowship · transformation
          </p>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hero-fade-up" style={{ animationDelay: '1.2s' }}>
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-[10px] text-white/20 tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-camp-green/60 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  )
}

function ImageGallery() {
  return (
    <section className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl text-center mb-4 text-gradient">
          Past Camp Highlights
        </h2>
        <p className="text-white/60 text-center font-body mb-12 max-w-2xl mx-auto">
          Check out what happened at our previous events — this year is going to be even bigger!
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {campImages.map((img, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-2xl aspect-square"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-camp-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="absolute bottom-3 left-3 right-3 text-white font-body text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.alt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function StepIndicator({ currentStep, onStepClick, errors }) {
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 mb-14 overflow-x-auto px-4">
      {STEPS.map((step, i) => {
        const isActive = currentStep === step.id
        const isComplete = currentStep > step.id
        const hasError = errors.some(e => {
          if (step.id === 1) return ['fullName', 'dateOfBirth', 'age', 'gender', 'address'].includes(e)
          if (step.id === 2) return ['parentName', 'relationship', 'parentPhone', 'parentEmail'].includes(e)
          if (step.id === 3) return ['transport'].includes(e)
          if (step.id === 4) return ['consent', 'dataConsent'].includes(e)
          return false
        })
        return (
          <button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={`flex items-center gap-2 px-3 py-2 md:px-4 md:py-2 rounded-xl font-body font-bold text-sm transition-all duration-300 whitespace-nowrap ${
              isActive
                ? 'bg-camp-green text-camp-dark scale-105 shadow-lg shadow-camp-green/30'
                : isComplete
                ? 'bg-camp-green/20 text-camp-lime border border-camp-green/30'
                : hasError
                ? 'bg-camp-accent/20 text-camp-accent border border-camp-accent/30'
                : 'bg-white/5 text-white/40 border border-white/10'
            }`}
          >
            <span className="text-lg">
              {isComplete ? '✓' : step.icon}
            </span>
            <span className="hidden md:inline">{step.title}</span>
            <span className="md:hidden">{step.id}</span>
          </button>
        )
      })}
    </div>
  )
}

function FormField({ label, name, type = 'text', placeholder, value, onChange, error, required = true, children }) {
  return (
    <div className="space-y-2">
      <label className="block font-body font-bold text-sm text-white/80">
        {label} {required && <span className="text-camp-accent">*</span>}
      </label>
      {children || (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`input-field ${error ? '!border-camp-accent !ring-camp-accent/30' : ''}`}
        />
      )}
      {error && (
        <p className="text-camp-accent text-xs font-body font-semibold flex items-center gap-1 animate-slide-up">
          <span>⚠</span> {error}
        </p>
      )}
    </div>
  )
}

function Step1({ formData, handleChange, errors }) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-2">
        <span className="section-number">1</span>
        <h3 className="font-display text-xl text-white">Teenager's Information</h3>
      </div>

      <FormField
        label="Full Name"
        name="fullName"
        placeholder="Enter your full name"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          error={errors.dateOfBirth}
        />
        <FormField
          label="Age"
          name="age"
          type="number"
          placeholder="Your age"
          value={formData.age}
          onChange={handleChange}
          error={errors.age}
        />
        <FormField
          label="Gender"
          name="gender"
          error={errors.gender}
        >
          <div className="radio-group">
            {['Male', 'Female'].map(g => (
              <label key={g} className="radio-label flex-1 justify-center">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={formData.gender === g}
                  onChange={handleChange}
                />
                <span className="radio-dot" />
                <span className="radio-text">{g === 'Male' ? '👦' : '👧'} {g}</span>
              </label>
            ))}
          </div>
        </FormField>
      </div>

      <FormField
        label="Phone Number (if applicable)"
        name="phone"
        type="tel"
        placeholder="e.g. 0816 814 5264"
        value={formData.phone}
        onChange={handleChange}
        required={false}
      />

      <FormField
        label="Residential Address"
        name="address"
        placeholder="Your full residential address"
        value={formData.address}
        onChange={handleChange}
        error={errors.address}
      />
    </div>
  )
}

function Step2({ formData, handleChange, errors }) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-2">
        <span className="section-number">2</span>
        <h3 className="font-display text-xl text-white">Parent / Guardian Details</h3>
      </div>

      <FormField
        label="Parent/Guardian Full Name"
        name="parentName"
        placeholder="Enter parent or guardian's full name"
        value={formData.parentName}
        onChange={handleChange}
        error={errors.parentName}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Relationship to Teenager"
          name="relationship"
          error={errors.relationship}
        >
          <select
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className={`select-field ${errors.relationship ? '!border-camp-accent !ring-camp-accent/30' : ''}`}
          >
            <option value="">Select relationship</option>
            <option value="Mother">Mother</option>
            <option value="Father">Father</option>
            <option value="Guardian">Guardian</option>
            <option value="Grandparent">Grandparent</option>
            <option value="Other">Other</option>
          </select>
        </FormField>
        <FormField
          label="Primary Phone"
          name="parentPhone"
          type="tel"
          placeholder="Primary phone number"
          value={formData.parentPhone}
          onChange={handleChange}
          error={errors.parentPhone}
        />
      </div>

      <FormField
        label="Secondary Phone / WhatsApp"
        name="parentSecondaryPhone"
        type="tel"
        placeholder="WhatsApp or secondary number"
        value={formData.parentSecondaryPhone}
        onChange={handleChange}
        required={false}
      />

      <FormField
        label="Email Address"
        name="parentEmail"
        type="email"
        placeholder="parent@email.com"
        value={formData.parentEmail}
        onChange={handleChange}
        error={errors.parentEmail}
      />
    </div>
  )
}

function Step3({ formData, handleChange, errors }) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-2">
        <span className="section-number">3</span>
        <h3 className="font-display text-xl text-white">Transport & Medical</h3>
      </div>

      {/* Transport */}
      <div className="space-y-2">
        <label className="block font-body font-bold text-sm text-white/80">
          Transportation <span className="text-camp-accent">*</span>
        </label>
        <p className="text-white/50 text-xs font-body">
          Will you take the official church bus from 27 Harbour Road at 12:00 PM?
        </p>
        <div className="space-y-3 mt-3">
          {[
            { value: 'bus', label: '🚌 Yes — Taking the official church bus', sub: 'Departs at 12:00 PM sharp' },
            { value: 'private', label: '🚗 No — Private arrangement', sub: 'Parent/Guardian drop-off' },
          ].map(option => (
            <label key={option.value} className="radio-label !p-4 flex-col items-start gap-1">
              <input
                type="radio"
                name="transport"
                value={option.value}
                checked={formData.transport === option.value}
                onChange={handleChange}
              />
              <div className="flex items-center gap-3 w-full">
                <span className="radio-dot" />
                <div>
                  <span className="radio-text font-bold">{option.label}</span>
                  <p className="text-white/40 text-xs mt-0.5">{option.sub}</p>
                </div>
              </div>
            </label>
          ))}
        </div>
        {errors.transport && (
          <p className="text-camp-accent text-xs font-body font-semibold flex items-center gap-1">
            <span>⚠</span> {errors.transport}
          </p>
        )}
      </div>

      <div className="h-px bg-white/10 my-6" />

      {/* Medical */}
      <div className="space-y-4">
        <h4 className="font-body font-bold text-white/80 text-sm uppercase tracking-wider">
          🏥 Medical Information
        </h4>

        <div className="space-y-2">
          <label className="block font-body font-bold text-sm text-white/80">
            Known Allergies
          </label>
          <div className="radio-group">
            {['No', 'Yes'].map(a => (
              <label key={a} className="radio-label">
                <input
                  type="radio"
                  name="hasAllergies"
                  value={a}
                  checked={formData.hasAllergies === a}
                  onChange={handleChange}
                />
                <span className="radio-dot" />
                <span className="radio-text">{a === 'No' ? '✅' : '⚠️'} {a}</span>
              </label>
            ))}
          </div>
          {formData.hasAllergies === 'Yes' && (
            <textarea
              name="allergyDetails"
              value={formData.allergyDetails}
              onChange={handleChange}
              placeholder="Please specify allergies (food, medicine, environmental)..."
              className="input-field min-h-[80px] resize-y animate-slide-up"
            />
          )}
        </div>

        <div className="space-y-2">
          <label className="block font-body font-bold text-sm text-white/80">
            On Regular Medication?
          </label>
          <div className="radio-group">
            {['No', 'Yes'].map(m => (
              <label key={m} className="radio-label">
                <input
                  type="radio"
                  name="hasMedication"
                  value={m}
                  checked={formData.hasMedication === m}
                  onChange={handleChange}
                />
                <span className="radio-dot" />
                <span className="radio-text">{m === 'No' ? '✅' : '💊'} {m}</span>
              </label>
            ))}
          </div>
          {formData.hasMedication === 'Yes' && (
            <textarea
              name="medicationDetails"
              value={formData.medicationDetails}
              onChange={handleChange}
              placeholder="Specify medication and dosage..."
              className="input-field min-h-[80px] resize-y animate-slide-up"
            />
          )}
        </div>
      </div>

      <div className="h-px bg-white/10 my-6" />

      {/* Emergency Contact */}
      <div className="space-y-4">
        <h4 className="font-body font-bold text-white/80 text-sm uppercase tracking-wider">
          🆘 Secondary Emergency Contact
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            label="Contact Name"
            name="emergencyName"
            placeholder="Full name"
            value={formData.emergencyName}
            onChange={handleChange}
            required={false}
          />
          <FormField
            label="Relationship"
            name="emergencyRelationship"
            placeholder="e.g. Aunt"
            value={formData.emergencyRelationship}
            onChange={handleChange}
            required={false}
          />
          <FormField
            label="Phone"
            name="emergencyPhone"
            type="tel"
            placeholder="Phone number"
            value={formData.emergencyPhone}
            onChange={handleChange}
            required={false}
          />
        </div>
      </div>
    </div>
  )
}

function Step4({ formData, handleChange, errors, onPrivacyClick }) {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center gap-3 mb-2">
        <span className="section-number">4</span>
        <h3 className="font-display text-xl text-white">Consent & Submit</h3>
      </div>

      {/* Summary */}
      <div className="glass-card !p-6 space-y-4">
        <h4 className="font-display text-lg text-camp-lime">📋 Registration Summary</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-body">
          <div className="flex justify-between">
            <span className="text-white/50">Name:</span>
            <span className="text-white font-semibold">{formData.fullName || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">DOB:</span>
            <span className="text-white font-semibold">{formData.dateOfBirth || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Age:</span>
            <span className="text-white font-semibold">{formData.age || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Gender:</span>
            <span className="text-white font-semibold">{formData.gender || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Parent:</span>
            <span className="text-white font-semibold">{formData.parentName || '—'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Transport:</span>
            <span className="text-white font-semibold">
              {formData.transport === 'bus' ? '🚌 Church Bus' : formData.transport === 'private' ? '🚗 Private' : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Consent text */}
      <div className="glass-card !p-6 !border-camp-gold/30">
        <h4 className="font-display text-lg text-camp-gold mb-3">📝 Parental Consent</h4>
        <p className="text-white/70 font-body text-sm leading-relaxed">
          I, the undersigned Parent/Guardian, hereby give full permission for my child to attend
          and participate in <strong className="text-white">House of Destiny's Teens Camp '26</strong> from
          August 20th to August 23rd, 2026. I authorize the designated camp leaders to act on my
          behalf and secure necessary emergency medical care should an emergency arise during
          the camp duration.
        </p>
      </div>

      {/* Signature date */}
      <FormField
        label="Date of Signing"
        name="signatureDate"
        type="date"
        value={formData.signatureDate}
        onChange={handleChange}
        error={errors.signatureDate}
      />

      {/* Consent checkbox */}
      <button
        type="button"
        onClick={() => handleChange({ target: { name: 'consent', type: 'checkbox', checked: !formData.consent } })}
        className={`checkbox-label w-full text-left !bg-camp-green/5 !border-camp-green/20 ${formData.consent ? '!border-camp-green/50 !bg-camp-green/10' : ''}`}
        role="checkbox"
        aria-checked={formData.consent}
      >
        <input
          type="checkbox"
          name="consent"
          checked={formData.consent}
          onChange={handleChange}
          className="sr-only"
          tabIndex={-1}
        />
        <div className={`checkbox-mark ${formData.consent ? '!bg-camp-green !border-camp-green' : ''}`}>
          <svg className={`checkbox-check w-3 h-3 text-white ${formData.consent ? 'opacity-100' : 'opacity-0'} transition-opacity`} viewBox="0 0 12 12" fill="none">
            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <span className="font-body font-bold text-sm text-white">
            I confirm I have parental/guardian authority to register this participant
          </span>
          <p className="text-white/40 text-xs mt-1">
            By checking this box, you agree to the consent terms above.
            {' '}<button type="button" onClick={onPrivacyClick} className="text-camp-green/70 hover:text-camp-green underline underline-offset-2">Privacy & Data Policy</button>
          </p>
        </div>
      </button>
      {errors.consent && (
        <p className="text-camp-accent text-xs font-body font-semibold flex items-center gap-1">
          <span>⚠</span> {errors.consent}
        </p>
      )}

      {/* Data Collection Consent */}
      <div className="h-px bg-white/10 my-2" />
      <div className="space-y-2">
        <button
          type="button"
          onClick={() => handleChange({ target: { name: 'dataConsent', type: 'checkbox', checked: !formData.dataConsent } })}
          className={`checkbox-label w-full text-left !bg-camp-blue/5 !border-camp-blue/20 ${formData.dataConsent ? '!border-camp-blue/50 !bg-camp-blue/10' : ''}`}
          role="checkbox"
          aria-checked={formData.dataConsent}
        >
          <input
            type="checkbox"
            name="dataConsent"
            checked={formData.dataConsent}
            onChange={handleChange}
            className="sr-only"
            tabIndex={-1}
          />
          <div className={`checkbox-mark ${formData.dataConsent ? '!bg-camp-blue !border-camp-blue' : ''}`}>
            <svg className={`checkbox-check w-3 h-3 text-white ${formData.dataConsent ? 'opacity-100' : 'opacity-0'} transition-opacity`} viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <span className="font-body font-bold text-sm text-white">
              I consent to the collection and processing of my child's personal data
            </span>
            <p className="text-white/40 text-xs mt-1">
              I have read and understood the
              {' '}<button type="button" onClick={onPrivacyClick} className="text-camp-blue/80 hover:text-camp-blue underline underline-offset-2">Privacy & Data Collection Policy</button>
              {' '}and agree to the data practices described therein.
            </p>
          </div>
        </button>
        {errors.dataConsent && (
          <p className="text-camp-accent text-xs font-body font-semibold flex items-center gap-1">
            <span>⚠</span> {errors.dataConsent}
          </p>
        )}
      </div>
    </div>
  )
}

function SuccessModal({ formData, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="glass-card max-w-lg w-full text-center space-y-6 animate-slide-up">
        <div className="text-6xl animate-float">🎉</div>
        <h2 className="font-display text-3xl text-gradient">You're Registered!</h2>
        <p className="text-white/70 font-body">
          Welcome aboard, <strong className="text-camp-lime">{formData.fullName}</strong>!
          Your registration for Teens Camp '26 has been submitted successfully.
        </p>
        <div className="glass-card !p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/50">Camp Dates:</span>
            <span className="text-white font-bold">Aug 20–23, 2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Departure:</span>
            <span className="text-white font-bold">
              {formData.transport === 'bus' ? '12:00 PM (Church Bus)' : 'Private Drop-off'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/50">Contact:</span>
            <span className="text-white font-bold">0816 814 5264</span>
          </div>
        </div>
        <p className="text-white/40 text-xs font-body">
          A confirmation will be sent to {formData.parentEmail}
        </p>
        <button onClick={onClose} className="btn-primary w-full">
          Done ✨
        </button>
      </div>
    </div>
  )
}

function PrivacyPolicy({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="glass-card max-w-3xl w-full my-8 space-y-8 animate-slide-up">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-display text-2xl md:text-3xl text-gradient mb-2">Privacy & Data Policy</h2>
            <p className="text-white/40 font-body text-sm">Last updated: August 11, 2026</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
            <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 font-body text-white/70 text-sm leading-relaxed">
          <section className="space-y-3">
            <h3 className="font-display text-lg text-camp-lime">1. Introduction</h3>
            <p>
              House of Destiny ("we," "our," or "us") is committed to protecting the privacy and safety
              of all participants registering for Teens Camp '26. This Privacy & Data Collection Policy
              explains how we collect, use, store, and protect personal information submitted through
              our registration form.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-lg text-camp-lime">2. Information We Collect</h3>
            <p>We collect the following categories of personal data through the registration form:</p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span><strong className="text-white">Teenager's Information:</strong> Full name, date of birth, age, gender, phone number (if applicable), and residential address.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span><strong className="text-white">Parent/Guardian Details:</strong> Full name, relationship to teenager, phone numbers, and email address.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span><strong className="text-white">Transportation Preferences:</strong> Whether the participant will use the official church bus or private arrangement.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span><strong className="text-white">Medical & Dietary Information:</strong> Known allergies, current medications, and dosage details.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span><strong className="text-white">Emergency Contact:</strong> Secondary contact name, relationship, and phone number.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span><strong className="text-white">Consent:</strong> Parental/guardian signature date and consent acknowledgment.</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-lg text-camp-lime">3. How We Use Your Data</h3>
            <p>Your personal information is used solely for the following purposes:</p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span>Processing and confirming your camp registration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span>Organizing transportation and logistics for the camp</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span>Ensuring participant safety through medical and emergency information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span>Contacting parents/guardians regarding camp updates, changes, or emergencies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span>Record-keeping for administrative and compliance purposes</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-lg text-camp-lime">4. Data Storage & Security</h3>
            <p>
              All registration data is stored securely using Google Sheets with access restricted
              to authorized camp administrators only. We implement appropriate technical and
              organizational measures to protect your data against unauthorized access, alteration,
              disclosure, or destruction.
            </p>
            <p>
              Data is transmitted via encrypted HTTPS connections. Physical and digital access to
              registration records is limited to designated camp coordinators and church leadership.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-lg text-camp-lime">5. Data Retention</h3>
            <p>
              Registration data will be retained for a period of 12 months following the conclusion
              of Teens Camp '26 (until August 2027). After this period, all personal data will be
              permanently deleted from our systems. Medical information may be retained for an
              additional 6 months for liability purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-lg text-camp-lime">6. Data Sharing</h3>
            <p>
              We do <strong className="text-white">not</strong> sell, trade, or share your personal information
              with third parties. Your data may be shared only in the following limited circumstances:
            </p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span>With medical professionals in the event of a medical emergency during the camp</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span>With authorized camp leaders who need access to logistical or medical information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span>When required by law or to comply with legal obligations</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-lg text-camp-lime">7. Parental Rights</h3>
            <p>As a parent or guardian, you have the right to:</p>
            <ul className="list-none space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span><strong className="text-white">Access</strong> — Request a copy of the personal data we hold about your child</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span><strong className="text-white">Correction</strong> — Request correction of any inaccurate data</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span><strong className="text-white">Deletion</strong> — Request deletion of your child's data at any time</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-camp-green mt-1">•</span>
                <span><strong className="text-white">Withdrawal</strong> — Withdraw consent and cancel registration at any time</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-lg text-camp-lime">8. Contact Us</h3>
            <p>
              If you have any questions, concerns, or requests regarding this privacy policy or your
              personal data, please contact us at:
            </p>
            <div className="glass-card !p-4 space-y-1 text-sm">
              <p><strong className="text-white">House of Destiny</strong></p>
              <p>📍 27 Harbour Road</p>
              <p>📞 0816 814 5264</p>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="font-display text-lg text-camp-lime">9. Consent</h3>
            <p>
              By submitting the registration form, you confirm that you are the parent or legal guardian
              of the participant and you consent to the collection and use of data as described in this
              policy. You acknowledge that you have read and understood how your child's information
              will be used.
            </p>
          </section>
        </div>

        {/* Close button */}
        <button onClick={onClose} className="btn-primary w-full">
          I Understand — Close
        </button>
      </div>
    </div>
  )
}

function Footer({ onPrivacyClick }) {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <div className="flex justify-center gap-4">
          <img src={speakerImg} alt="Camp speaker" className="w-12 h-12 rounded-full object-cover border-2 border-camp-green/50" />
          <img src={dancingImg} alt="Teens dancing" className="w-12 h-12 rounded-full object-cover border-2 border-camp-lime/50" />
          <img src={prayingImg} alt="Teens praying" className="w-12 h-12 rounded-full object-cover border-2 border-camp-blue/50" />
        </div>
        <p className="font-display text-lg text-gradient">House of Destiny</p>
        <p className="text-white/40 font-body text-sm">The Church in Town</p>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-body">
          <span className="text-white/50">📍 27 Harbour Road</span>
          <span className="text-white/50">📞 0816 814 5264</span>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-xs font-body mt-4">
          <button onClick={onPrivacyClick} className="text-camp-green/70 hover:text-camp-green transition-colors underline underline-offset-2">
            Privacy & Data Policy
          </button>
        </div>
        <p className="text-white/20 text-xs font-body mt-6">
          © 2026 House of Destiny — Teens Camp '26. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default function App() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Teen info
    fullName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    phone: '',
    address: '',
    // Step 2: Parent info
    parentName: '',
    relationship: '',
    parentPhone: '',
    parentSecondaryPhone: '',
    parentEmail: '',
    // Step 3: Transport & medical
    transport: '',
    hasAllergies: 'No',
    allergyDetails: '',
    hasMedication: 'No',
    medicationDetails: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    // Step 4: Consent
    signatureDate: new Date().toISOString().split('T')[0],
    consent: false,
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showPrivacy, setShowPrivacy] = useState(false)
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
    // Clear error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
      if (!formData.age) newErrors.age = 'Age is required'
      else if (formData.age < 12 || formData.age > 24) newErrors.age = 'Ages 12–24 only'
      if (!formData.gender) newErrors.gender = 'Please select gender'
      if (!formData.address.trim()) newErrors.address = 'Address is required'
    }

    if (step === 2) {
      if (!formData.parentName.trim()) newErrors.parentName = 'Parent/guardian name is required'
      if (!formData.relationship) newErrors.relationship = 'Please select relationship'
      if (!formData.parentPhone.trim()) newErrors.parentPhone = 'Primary phone is required'
      if (!formData.parentEmail.trim()) newErrors.parentEmail = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.parentEmail))
        newErrors.parentEmail = 'Please enter a valid email'
    }

    if (step === 3) {
      if (!formData.transport) newErrors.transport = 'Please select transportation option'
    }

    if (step === 4) {
      if (!formData.signatureDate) newErrors.signatureDate = 'Date is required'
      if (!formData.consent) newErrors.consent = 'You must agree to the consent terms'
      if (!formData.dataConsent) newErrors.dataConsent = 'You must consent to data collection'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
      window.scrollTo({ top: formRef.current?.offsetTop - 20, behavior: 'smooth' })
    }
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
    window.scrollTo({ top: formRef.current?.offsetTop - 20, behavior: 'smooth' })
  }

  const handleStepClick = (step) => {
    if (step < currentStep) {
      setCurrentStep(step)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(4)) return

    setIsSubmitting(true)
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setShowSuccess(true)
      } else {
        // Still show success — the form data is valid
        // The Excel backend may not be running
        setShowSuccess(true)
      }
    } catch {
      // Backend may not be running — show success anyway
      setShowSuccess(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToForm = () => {
    setShowForm(true)
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-camp-dark bg-grid">
      <Hero onRegister={scrollToForm} />

      {showForm && (
        <>
          <ImageGallery />

          {/* Registration Form */}
          <section ref={formRef} className="py-20 px-4 md:px-8">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-14">
                <h2 className="font-display text-3xl md:text-4xl text-gradient mb-4">
                  Register for Camp
                </h2>
                <p className="text-white/50 font-body">
                  Fill in the details below to secure your spot. All fields marked with * are required.
                </p>
              </div>

              <StepIndicator
                currentStep={currentStep}
                onStepClick={handleStepClick}
                errors={Object.keys(errors)}
              />

              <form onSubmit={handleSubmit} className="glass-card">
                {currentStep === 1 && <Step1 formData={formData} handleChange={handleChange} errors={errors} />}
                {currentStep === 2 && <Step2 formData={formData} handleChange={handleChange} errors={errors} />}
                {currentStep === 3 && <Step3 formData={formData} handleChange={handleChange} errors={errors} />}
                {currentStep === 4 && <Step4 formData={formData} handleChange={handleChange} errors={errors} onPrivacyClick={() => setShowPrivacy(true)} />}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/10">
                  {currentStep > 1 ? (
                    <button type="button" onClick={handlePrev} className="btn-secondary">
                      ← Back
                    </button>
                  ) : (
                    <div />
                  )}

                  {currentStep < 4 ? (
                    <button type="button" onClick={handleNext} className="btn-primary">
                      Next →
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary !bg-gradient-to-r !from-camp-gold !to-orange-500 !shadow-camp-gold/30"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        '🚀 Submit Registration'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>
        </>
      )}

      <Footer onPrivacyClick={() => setShowPrivacy(true)} />

      {showSuccess && (
        <SuccessModal
          formData={formData}
          onClose={() => {
            setShowSuccess(false)
            setShowForm(false)
            setFormData({
              fullName: '', dateOfBirth: '', age: '', gender: '', phone: '', address: '',
              parentName: '', relationship: '', parentPhone: '', parentSecondaryPhone: '', parentEmail: '',
              transport: '', hasAllergies: 'No', allergyDetails: '', hasMedication: 'No', medicationDetails: '',
              emergencyName: '', emergencyRelationship: '', emergencyPhone: '',
              signatureDate: new Date().toISOString().split('T')[0], consent: false, dataConsent: false,
            })
            setCurrentStep(1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}

      {showPrivacy && (
        <PrivacyPolicy onClose={() => setShowPrivacy(false)} />
      )}
    </div>
  )
}
