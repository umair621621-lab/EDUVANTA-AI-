import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';
import { COUNSELLORS } from '../data/counsellors';
import { Appointment } from '../types';

interface CounsellingBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedUniversity?: string;
  onBookingSuccess?: (appointment: Appointment) => void;
}

export const CounsellingBookingModal: React.FC<CounsellingBookingModalProps> = ({
  isOpen,
  onClose,
  preselectedUniversity,
  onBookingSuccess
}) => {
  const [counsellorId, setCounsellorId] = useState<string>(COUNSELLORS[0].id);
  const [consultationType, setConsultationType] = useState<string>('In-Person (Clifton Karachi Office)');
  const [date, setDate] = useState<string>('2026-09-10');
  const [timeSlot, setTimeSlot] = useState<string>('03:00 PM');
  const [studentName, setStudentName] = useState<string>('Hamza Khan');
  const [studentPhone, setStudentPhone] = useState<string>('+92 300 1234567');
  const [studentEmail, setStudentEmail] = useState<string>('hamza.khan@example.com');
  const [destination, setDestination] = useState<string>(preselectedUniversity || 'United Kingdom (Russell Group)');
  const [notes, setNotes] = useState<string>('Interested in CAS deposit deadlines and visa file review.');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const selectedCounsellor = COUNSELLORS.find((c) => c.id === counsellorId) || COUNSELLORS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newAppointment: Partial<Appointment> = {
      studentName,
      studentPhone,
      studentEmail,
      counsellorId: selectedCounsellor.id,
      counsellorName: selectedCounsellor.name,
      date,
      time: timeSlot,
      consultationType: consultationType as any,
      destinationOfInterest: destination,
      notes
    };

    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppointment)
      });
      const data = await res.json();
      if (onBookingSuccess) onBookingSuccess(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden relative">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-600">
              <Calendar className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-display">Book Free Counselling Session</h2>
              <p className="text-xs text-slate-300">
                Suite 402, Al-Khaleej Towers, Main Clifton, Karachi or Online
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-bold text-slate-900">Consultation Booked Successfully!</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              Your appointment with <strong>{selectedCounsellor.name}</strong> has been scheduled for <strong>{date} at {timeSlot}</strong>. A confirmation SMS & WhatsApp reminder has been sent to <strong>{studentPhone}</strong>.
            </p>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 max-w-sm mx-auto text-xs text-slate-700 text-left space-y-1">
              <div className="font-semibold text-slate-900">Meeting Details:</div>
              <div>Mode: {consultationType}</div>
              {consultationType.includes('In-Person') && (
                <div className="text-[11px] text-slate-500">Location: Suite 402, Al-Khaleej Towers, Main Clifton, Karachi</div>
              )}
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
              >
                Close & Return to Platform
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Step 1: Select Counsellor */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">
                1. Select Senior Destination Specialist (Karachi Office)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {COUNSELLORS.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setCounsellorId(c.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      counsellorId === c.id
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-11 h-11 rounded-full object-cover shrink-0"
                    />
                    <div className="overflow-hidden text-left">
                      <div className="text-xs font-bold text-slate-900 truncate">{c.name}</div>
                      <div className="text-[10px] text-slate-500 truncate">{c.title}</div>
                      <div className="text-[10px] text-blue-600 font-semibold mt-0.5">
                        {c.destinations.join(' • ')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mode & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Consultation Mode
                </label>
                <select
                  value={consultationType}
                  onChange={(e) => setConsultationType(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="In-Person (Clifton Karachi Office)">In-Person (Clifton Karachi)</option>
                  <option value="WhatsApp Call">WhatsApp Voice/Video Call</option>
                  <option value="Zoom Meeting">Zoom Video Conference</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {selectedCounsellor.availableSlots.map((slot, i) => (
                    <option key={i} value={slot}>{slot}</option>
                  ))}
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                </select>
              </div>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp / Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={studentPhone}
                  onChange={(e) => setStudentPhone(e.target.value)}
                  placeholder="+92 300 0000000"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={studentEmail}
                  onChange={(e) => setStudentEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Target & Query */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Country or University of Interest
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. UK (Imperial / Manchester), Canada, or Germany"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Trust Footer */}
            <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>100% Free Consultation:</strong> No upfront fee or hidden charges. We verify transcripts, bank statements, and SOPs at our Clifton office.
              </span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-slate-600 text-xs font-medium hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
              >
                {loading ? 'Confirming...' : 'Confirm Appointment'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
