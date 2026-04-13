export const trucks = [
  {
    id: "TRK-01",
    name: "Kenworth T680",
    emoji: "🚛",
    status: "ok",
    driver: { name: "Mike Johnson", initials: "MJ", status: "on-duty" },
    odometer: "184,220 km",
    year: "2021",
    vin: "1XKWDB0X8LJ123456",
    nextService: { label: "In 18 days", type: "ok", name: "Oil Change" },
    overview: {
      license: "6L 7823",
      insurance: "Valid until Aug 2026",
      registration: "Valid until Dec 2026"
    },
    maintenance: [
      { date: "Mar 28, 2026", title: "Oil Change & Filter", desc: "Synthetic 15W-40, oil filter replaced", tag: "completed", odometer: "183,400 km" },
      { date: "Jan 14, 2026", title: "Tyre Rotation", desc: "All 6 drive tyres rotated and balanced", tag: "completed", odometer: "176,200 km" },
      { date: "Nov 02, 2025", title: "Brake Inspection", desc: "Front and rear brakes checked, pads 60% remaining", tag: "completed", odometer: "168,900 km" },
      { date: "Apr 24, 2026", title: "Scheduled Oil Change", desc: "Due service — book appointment", tag: "scheduled", odometer: "~188,000 km" }
    ],
    documents: [
      { name: "Registration Certificate", expiry: "Dec 15, 2026", status: "ok", icon: "📋" },
      { name: "Commercial Insurance", expiry: "Aug 03, 2026", status: "ok", icon: "🛡️" },
      { name: "Safety Inspection", expiry: "May 10, 2026", status: "warn", icon: "🔍" },
      { name: "CVIP Certificate", expiry: "Jul 22, 2026", status: "ok", icon: "✅" }
    ]
  },
  {
    id: "TRK-02",
    name: "Peterbilt 389",
    emoji: "🛻",
    status: "danger",
    driver: { name: "Dave Reyes", initials: "DR", status: "off-duty" },
    odometer: "231,080 km",
    year: "2019",
    vin: "1XP5DB9X5KD654321",
    nextService: { label: "Overdue 9 days", type: "danger", name: "Oil Change" },
    overview: {
      license: "8K 4421",
      insurance: "EXPIRED",
      registration: "Valid until Oct 2026"
    },
    maintenance: [
      { date: "Jan 20, 2026", title: "Oil Change", desc: "Overdue — not yet completed", tag: "scheduled", odometer: "230,000 km" },
      { date: "Oct 11, 2025", title: "Air Filter Replacement", desc: "Engine air filter replaced", tag: "completed", odometer: "220,450 km" },
      { date: "Aug 02, 2025", title: "Brake Service", desc: "Rear brake drums replaced", tag: "completed", odometer: "212,100 km" }
    ],
    documents: [
      { name: "Registration Certificate", expiry: "Oct 20, 2026", status: "ok", icon: "📋" },
      { name: "Commercial Insurance", expiry: "Apr 01, 2026", status: "danger", icon: "🛡️" },
      { name: "Safety Inspection", expiry: "Apr 18, 2026", status: "warn", icon: "🔍" },
      { name: "CVIP Certificate", expiry: "Jun 05, 2026", status: "ok", icon: "✅" }
    ]
  },
  {
    id: "TRK-03",
    name: "Freightliner Cascadia",
    emoji: "🚚",
    status: "warn",
    driver: { name: "Sarah Mitchell", initials: "SM", status: "on-duty" },
    odometer: "98,440 km",
    year: "2023",
    vin: "3AKJHHDR4NSNA7891",
    nextService: { label: "In 5 days", type: "warn", name: "Tyre Rotation" },
    overview: {
      license: "2M 9934",
      insurance: "Valid until Nov 2026",
      registration: "Valid until Mar 2027"
    },
    maintenance: [
      { date: "Feb 20, 2026", title: "Oil Change", desc: "Full synthetic, filter replaced", tag: "completed", odometer: "95,200 km" },
      { date: "Dec 05, 2025", title: "Coolant Flush", desc: "Coolant replaced, system purged", tag: "completed", odometer: "88,300 km" },
      { date: "Apr 18, 2026", title: "Tyre Rotation", desc: "Scheduled — due in 5 days", tag: "scheduled", odometer: "~100,000 km" }
    ],
    documents: [
      { name: "Registration Certificate", expiry: "Mar 10, 2027", status: "ok", icon: "📋" },
      { name: "Commercial Insurance", expiry: "Nov 14, 2026", status: "ok", icon: "🛡️" },
      { name: "Safety Inspection", expiry: "Apr 20, 2026", status: "warn", icon: "🔍" },
      { name: "CVIP Certificate", expiry: "Aug 01, 2026", status: "ok", icon: "✅" }
    ]
  },
  {
    id: "TRK-04",
    name: "Mack Anthem",
    emoji: "🚛",
    status: "danger",
    driver: { name: "Tom Bergmann", initials: "TB", status: "on-duty" },
    odometer: "312,670 km",
    year: "2018",
    vin: "1M2AN07Y5HM399012",
    nextService: { label: "Overdue 22 days", type: "danger", name: "Full Service" },
    overview: {
      license: "9F 1188",
      insurance: "Valid until Aug 2026",
      registration: "Valid until Sep 2026"
    },
    maintenance: [
      { date: "Mar 01, 2026", title: "Full Service", desc: "Overdue — vehicle still active", tag: "scheduled", odometer: "310,000 km" },
      { date: "Nov 19, 2025", title: "Oil Change", desc: "Standard mineral oil", tag: "completed", odometer: "298,400 km" },
      { date: "Sep 03, 2025", title: "Transmission Service", desc: "Fluid replaced, filter changed", tag: "completed", odometer: "285,600 km" }
    ],
    documents: [
      { name: "Registration Certificate", expiry: "Sep 08, 2026", status: "ok", icon: "📋" },
      { name: "Commercial Insurance", expiry: "Aug 25, 2026", status: "ok", icon: "🛡️" },
      { name: "Safety Inspection", expiry: "Apr 05, 2026", status: "danger", icon: "🔍" },
      { name: "CVIP Certificate", expiry: "May 30, 2026", status: "warn", icon: "✅" }
    ]
  },
  {
    id: "TRK-05",
    name: "Volvo VNL 860",
    emoji: "🚚",
    status: "ok",
    driver: { name: "Amy Chowdhury", initials: "AC", status: "on-duty" },
    odometer: "55,320 km",
    year: "2024",
    vin: "4V4NC9EH4PN123789",
    nextService: { label: "In 34 days", type: "ok", name: "Oil Change" },
    overview: {
      license: "3P 7720",
      insurance: "Valid until Feb 2027",
      registration: "Valid until Jan 2027"
    },
    maintenance: [
      { date: "Mar 15, 2026", title: "Oil Change", desc: "Full synthetic 5W-30", tag: "completed", odometer: "52,100 km" },
      { date: "Jan 08, 2026", title: "30k Service", desc: "Comprehensive check at 30,000 km", tag: "completed", odometer: "30,000 km" },
      { date: "May 17, 2026", title: "Scheduled Oil Change", desc: "Upcoming — add to calendar", tag: "scheduled", odometer: "~62,000 km" }
    ],
    documents: [
      { name: "Registration Certificate", expiry: "Jan 20, 2027", status: "ok", icon: "📋" },
      { name: "Commercial Insurance", expiry: "Feb 10, 2027", status: "ok", icon: "🛡️" },
      { name: "Safety Inspection", expiry: "Dec 01, 2026", status: "ok", icon: "🔍" },
      { name: "CVIP Certificate", expiry: "Nov 15, 2026", status: "ok", icon: "✅" }
    ]
  }
];

export const notifications = [
  { type: "danger", icon: "🛡️", title: "Insurance Expired — Peterbilt 389", desc: "TRK-02 commercial insurance expired 12 days ago. Renew immediately.", time: "12 days ago", unread: true },
  { type: "danger", icon: "🔧", title: "Overdue Maintenance — Mack Anthem", desc: "TRK-04 full service is 22 days overdue. Schedule now.", time: "22 days ago", unread: true },
  { type: "warn", icon: "📄", title: "Safety Inspection Expiring — Freightliner", desc: "TRK-03 safety inspection expires in 5 days (Apr 18).", time: "2 days ago", unread: true },
  { type: "warn", icon: "👤", title: "Driver License Expiring — Dave Reyes", desc: "Dave Reyes' CDL expires in 12 days. Remind driver to renew.", time: "3 days ago", unread: true },
  { type: "warn", icon: "🔧", title: "Service Due — Kenworth T680", desc: "TRK-01 oil change is due in 18 days. Book appointment.", time: "5 days ago", unread: false }
];
