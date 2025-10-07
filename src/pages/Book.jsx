// ai generated

import { useState } from "react";

const initial = {
  name: "",
  email: "",
  phone: "",
  pickup: "",
  dropoff: "",
  date: "",
  time: "",
  service: "on_demand",
  passengers: 1,
  notes: "",
};

export default function Book() {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate(values) {
    const e = {};
    if (!values.name.trim()) e.name = "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(values.phone.replace(/\D/g, "")))
      e.phone = "10-digit phone required";
    if (!values.pickup.trim()) e.pickup = "Pickup location required";
    if (!values.dropoff.trim()) e.dropoff = "Drop-off location required";
    if (!values.date) e.date = "Date required";
    if (!values.time) e.time = "Time required";
    if (Number(values.passengers) < 1) e.passengers = "At least 1 passenger";
    // optional: block past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const picked = values.date ? new Date(values.date) : null;
    if (picked && picked < today) e.date = "Choose today or a future date";
    return e;
  }

  function onSubmit(e) {
    e.preventDefault();
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length === 0) {
      // pretend to send to server
      setSubmitted(true);
      setForm(initial);
      setTimeout(() => setSubmitted(false), 3000);
    }
  }

  return (
    <div className="container">
      <h2>Book a Ride</h2>
      <form className="card" onSubmit={onSubmit} noValidate>
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Jane Doe"
        />
        {errors.name && <div className="error">{errors.name}</div>}

        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="jane@email.com"
        />
        {errors.email && <div className="error">{errors.email}</div>}

        <label>Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={onChange}
          placeholder="(555) 123-4567"
        />
        {errors.phone && <div className="error">{errors.phone}</div>}

        <label>Pickup Location</label>
        <input
          name="pickup"
          value={form.pickup}
          onChange={onChange}
          placeholder="123 Main St"
        />
        {errors.pickup && <div className="error">{errors.pickup}</div>}

        <label>Drop-off Location</label>
        <input
          name="dropoff"
          value={form.dropoff}
          onChange={onChange}
          placeholder="Airport Terminal B"
        />
        {errors.dropoff && <div className="error">{errors.dropoff}</div>}

        <div className="grid">
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={onChange}
            />
            {errors.date && <div className="error">{errors.date}</div>}
          </div>
          <div>
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={form.time}
              onChange={onChange}
            />
            {errors.time && <div className="error">{errors.time}</div>}
          </div>
        </div>

        <label>Service</label>
        <select name="service" value={form.service} onChange={onChange}>
          <option value="on_demand">On-Demand</option>
          <option value="airport">Airport Transfer</option>
          <option value="hourly">Hourly</option>
          <option value="tour">City Tour</option>
        </select>

        <label>Passengers</label>
        <input
          type="number"
          name="passengers"
          min="1"
          value={form.passengers}
          onChange={onChange}
        />
        {errors.passengers && <div className="error">{errors.passengers}</div>}

        <label>Notes (optional)</label>
        <textarea
          name="notes"
          rows="3"
          value={form.notes}
          onChange={onChange}
          placeholder="Gate info, child seat, etc."
        />

        <button type="submit">Confirm Booking</button>
        {submitted && (
          <p style={{ marginTop: 12 }}>
            ✅ Booking request sent! We’ll text you a confirmation.
          </p>
        )}
      </form>
    </div>
  );
}
