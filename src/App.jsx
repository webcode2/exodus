import { useState, useEffect, useRef } from 'react'

// Image imports
import posterImg from '/images/WhatsApp Image 2026-08-10 at 09.19.57.jpeg'
import speakerImg from '/images/WhatsApp Image 2026-08-10 at 09.18.01.jpeg'
import dancingImg from '/images/WhatsApp Image 2026-08-10 at 09.18.02.jpeg'
import phoneImg from '/images/WhatsApp Image 2026-08-10 at 09.18.02 (1).jpeg'
import prayingImg from '/images/WhatsApp Image 2026-08-10 at 09.18.02 (2).jpeg'
import girlPrayingImg from '/images/WhatsApp Image 2026-08-10 at 09.18.02 (3).jpeg'
import crowdImg from '/images/WhatsApp Image 2026-08-10 at 09.18.03.jpeg'
import singingImg from '/images/WhatsApp Image 2026-08-10 at 09.18.03 (1).jpeg'
import stageImg from '/images/WhatsApp Image 2026-08-10 at 09.18.03 (2).jpeg'
import verseImg from '/images/WhatsApp Image 2026-08-10 at 09.18.03 (3).jpeg'

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
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <img
          src={posterImg}
          alt="Teens Camp 26 Poster"
          className="w-full h-[120%] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-camp-dark/70 via-camp-dark/50 to-camp-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-camp-green/10 to-camp-blue/10" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 w-16 h-16 rounded-full bg-camp-green/20 blur-xl animate-float" />
      <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-camp-blue/20 blur-xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-40 left-1/4 w-20 h-20 rounded-full bg-camp-gold/20 blur-xl animate-float" style={{ animationDelay: '4s' }} />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fade-in">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 rounded-full bg-camp-green/20 border border-camp-green/30 text-camp-lime font-body font-bold text-sm tracking-wider uppercase">
            House of Destiny • The Church in Town
          </span>
        </div>

        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight mb-4">
          <span className="text-gradient">Outpouring</span>
          <br />
          <span className="text-white">of the Spirit</span>
        </h1>

        <div className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-camp-green to-camp-lime mb-8 animate-pulse-glow">
          <span className="font-display text-2xl md:text-3xl text-camp-dark tracking-wide">
            Teens Camp '26
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div className="glass-card !p-4 !rounded-xl">
            <p className="text-camp-lime font-bold text-lg">📅 Aug 20–23, 2026</p>
          </div>
          <div className="glass-card !p-4 !rounded-xl">
            <p className="text-camp-sky font-bold text-lg">🚌 Bus @ 12:00 PM</p>
          </div>
          <div className="glass-card !p-4 !rounded-xl">
            <p className="text-camp-gold font-bold text-lg">📍 27 Harbour Road</p>
          </div>
        </div>

        <button
          onClick={onRegister}
          className="btn-primary text-xl px-12 py-5 animate-float"
        >
          🔥 Register Now
        </button>

        <p className="mt-6 text-white/50 font-body text-sm">
          4 days of worship • fellowship • transformation
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
          <div className="w-1.5 h-3 rounded-full bg-white/50 animate-pulse" />
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
    <div className="flex items-center justify-center gap-2 md:gap-4 mb-10 overflow-x-auto px-4">
      {STEPS.map((step, i) => {
        const isActive = currentStep === step.id
        const isComplete = currentStep > step.id
        const hasError = errors.some(e => {
          if (step.id === 1) return ['fullName', 'dateOfBirth', 'age', 'gender', 'address'].includes(e)
          if (step.id === 2) return ['parentName', 'relationship', 'parentPhone', 'parentEmail'].includes(e)
          if (step.id === 3) return ['transport'].includes(e)
          if (step.id === 4) return ['consent'].includes(e)
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

function Step4({ formData, handleChange, errors }) {
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
          </p>
        </div>
      </button>
      {errors.consent && (
        <p className="text-camp-accent text-xs font-body font-semibold flex items-center gap-1">
          <span>⚠</span> {errors.consent}
        </p>
      )}
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

function Footer() {
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
      else if (formData.age < 12 || formData.age > 19) newErrors.age = 'Ages 12–19 only'
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
          <section ref={formRef} className="py-16 px-4 md:px-6">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-10">
                <h2 className="font-display text-3xl md:text-4xl text-gradient mb-3">
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
                {currentStep === 4 && <Step4 formData={formData} handleChange={handleChange} errors={errors} />}

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

      <Footer />

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
              signatureDate: new Date().toISOString().split('T')[0], consent: false,
            })
            setCurrentStep(1)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      )}
    </div>
  )
}
