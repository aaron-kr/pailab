// src/scripts/seed-research.ts
// ═══════════════════════════════════════════════════════════
// ONE-TIME IMPORT — seed the research tracker with all known
// research ideas from our planning sessions.
//
// HOW TO RUN:
//   npx tsx src/scripts/seed-research.ts
//   (or: ts-node src/scripts/seed-research.ts)
//
// REQUIREMENTS:
//   npm install tsx firebase
//   Make sure .env has your Firebase credentials.
// ═══════════════════════════════════════════════════════════

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import * as dotenv from "dotenv";

dotenv.config();

// ── Firebase Admin init ────────────────────────────────────
// For admin SDK you need a service account key.
// Download from: Firebase Console → Project Settings → Service accounts
// Save as: service-account.json (DON'T commit this file)
let adminApp;
try {
  const serviceAccount = require("../../service-account.json");
  adminApp = initializeApp({ credential: cert(serviceAccount) });
} catch {
  // Alternative: use GOOGLE_APPLICATION_CREDENTIALS env var
  adminApp = initializeApp();
}

const db = getFirestore(adminApp);

// ── Research ideas data ────────────────────────────────────
type Status = "idea" | "active" | "writing" | "submitted" | "published" | "paused";
type Priority = "high" | "medium" | "low";

interface ResearchIdea {
  title: string;
  description: string;
  category: string;
  tags: string[];
  status: Status;
  priority: Priority;
  venue?: string;
  notes?: string;
  assignedTo?: string;
  deadline?: string;
}

const ideas: ResearchIdea[] = [
  // ── From CV / existing work ─────────────────────────────
  {
    title: "Mapping the Physical AI Landscape in Education",
    description: "Survey paper mapping Physical AI curriculum globally — course offerings by country, category, tags. Target: inaugural issue of 한국피지컬AI학회 Journal.",
    category: "Survey / Education",
    tags: ["survey", "curriculum", "education", "PAI", "landscape"],
    status: "active",
    priority: "high",
    venue: "한국피지컬AI학회 Journal (KSPAI)",
    notes: "Building Google Sheets database of course offerings. Deadline June. PI leads framing/intro. Use PAI-9 Framework as named contribution.",
    deadline: "2025-06-30",
  },
  {
    title: "Sim-to-Real Gap on a Budget",
    description: "Train a manipulation or locomotion policy in simulation (Isaac Gym / MuJoCo), deploy on cheap hardware (Jetson / RPi), systematically measure the gap. Benchmarks paper.",
    category: "Simulation / Robotics",
    tags: ["sim-to-real", "robotics", "Isaac Gym", "MuJoCo", "edge AI", "benchmarks"],
    status: "idea",
    priority: "high",
    venue: "ICRA workshop / RA-L short",
    notes: "6–8 week scope. Good first hardware paper. Student-ledable with clear metrics.",
  },
  {
    title: "Edge Vision for Robotic Trigger Detection",
    description: "Deploy a fine-tuned YOLO variant on Jetson Nano or RPi 5. Benchmark latency/accuracy tradeoffs under real-world lighting and occlusion.",
    category: "Computer Vision / Edge AI",
    tags: ["YOLO", "edge inference", "Jetson Nano", "computer vision", "robotics", "latency"],
    status: "idea",
    priority: "high",
    venue: "ICTC / KCI journal",
    notes: "Builds directly on Aaron's mask detection and CNN work. Natural Physical AI extension of existing CV thread.",
  },
  {
    title: "Human-in-the-Loop Correction Study",
    description: "Build a small robot task (pick-and-place or navigation). Study how few corrective demonstrations are needed to adapt a pretrained policy. RLHF/HITL literature connection.",
    category: "HRI / Learning",
    tags: ["HITL", "RLHF", "demonstration learning", "robotics", "pick-and-place"],
    status: "idea",
    priority: "medium",
    venue: "HRI conference / CoRL workshop",
    notes: "Needs robot hardware. Good for a student with ML background.",
  },
  {
    title: "Physical LLM Interface",
    description: "Use an LLM (via API) as a task planner for a physical agent. Systematically evaluate failure modes — timing, ambiguity, grounding errors.",
    category: "LLM / Robotics",
    tags: ["LLM", "task planning", "robotics", "failure modes", "language grounding"],
    status: "idea",
    priority: "high",
    venue: "CoRL / IROS workshop",
    notes: "Very publishable right now given LLM-robotics interest. API cost manageable. Can use ROS 2 or just Arduino for the 'agent'.",
  },
  {
    title: "Tactile/Sensor Fusion Baseline",
    description: "If force or tactile sensors available, create a dataset + baseline model. Even a small contribution to an underexplored area has value.",
    category: "Sensor Fusion",
    tags: ["tactile", "sensor fusion", "dataset", "baseline", "edge ML"],
    status: "idea",
    priority: "low",
    venue: "IEEE Sensors / IROS",
    notes: "Depends on hardware availability. Low priority until lab is better equipped.",
  },
  // ── From CV — existing work extended to Physical AI ─────
  {
    title: "On-Device Grapheme Classification with Edge Deployment",
    description: "Extension of Aaron's handwritten grapheme classification thesis work: same models deployed on Jetson / RPi with latency and accuracy benchmarking.",
    category: "Computer Vision / Edge AI",
    tags: ["OCR", "grapheme", "on-device", "edge inference", "Korean", "handwriting"],
    status: "idea",
    priority: "medium",
    venue: "IEICE / KIICE journal",
    notes: "Direct Physical AI extension of Aaron's CNN/OCR thesis. Strong prior work foundation.",
  },
  {
    title: "ACGAN Data Augmentation for Physical AI Perception",
    description: "Apply ACGAN dataset supplementation methodology to robotic perception tasks — address data scarcity for edge vision models.",
    category: "Computer Vision / ML",
    tags: ["ACGAN", "GAN", "data augmentation", "robotic perception", "edge vision"],
    status: "idea",
    priority: "medium",
    venue: "Pattern Recognition Letters / KCI journal",
    notes: "Builds on existing ACGAN paper work. Need to connect to physical deployment scenario.",
  },
  {
    title: "Gesture-Controlled Robotic Arm with Edge Inference",
    description: "Real-time hand gesture recognition on embedded hardware controlling a robotic arm. Full Physical AI pipeline: perception → inference → actuation.",
    category: "Robotics / HRI",
    tags: ["gesture recognition", "robotic arm", "edge inference", "real-time", "HRI"],
    status: "idea",
    priority: "high",
    venue: "ICTC / IEEE Access",
    notes: "Very demonstrable at conferences. Good for showcase video. Student-friendly hardware project.",
  },
  {
    title: "Kalman Filter IMU Fusion for Low-Cost Robotics",
    description: "Implement and benchmark complementary + Kalman filter approaches for IMU sensor fusion on ESP32/Arduino. Compare stability vs cost vs complexity.",
    category: "Sensor Fusion / Embedded",
    tags: ["Kalman filter", "IMU", "ESP32", "sensor fusion", "embedded", "Arduino"],
    status: "idea",
    priority: "medium",
    venue: "Sensors (MDPI) / KIICE",
    notes: "Good module + paper combo. Relates to IoT sensor fusion plug-in module already designed.",
  },
  {
    title: "ROS 2 Autonomous Navigation on Budget Hardware",
    description: "Full autonomous navigation stack (Nav2) on a Raspberry Pi-based platform. Benchmark against compute and cost constraints for university lab settings.",
    category: "Robotics / ROS",
    tags: ["ROS 2", "Nav2", "autonomous navigation", "Raspberry Pi", "mobile robot"],
    status: "idea",
    priority: "medium",
    venue: "RO-MAN / ICCAS",
    notes: "Requires wheeled robot platform. Check what hardware is available.",
  },
  {
    title: "Digital Twin for Lab Equipment Using Isaac Sim",
    description: "Build a digital twin of a lab hardware setup (e.g., robotic arm or conveyor) in NVIDIA Isaac Sim. Evaluate sim-to-real transfer for that specific setup.",
    category: "Digital Twin / Simulation",
    tags: ["digital twin", "Isaac Sim", "sim-to-real", "NVIDIA", "factory automation"],
    status: "idea",
    priority: "low",
    venue: "ICRA / IROS",
    notes: "Requires Isaac Sim setup. Medium-term. Good NVIDIA Inception showcase project.",
  },
  {
    title: "PAI-9 Framework: A 3×3 Competency Model for Physical AI Education",
    description: "Formalize and validate the PAI-9 Framework (Physical AI, 9 competencies) as a citable contribution. Survey educators to validate the 3×3 matrix.",
    category: "Education / Framework",
    tags: ["PAI-9", "competency framework", "Physical AI education", "curriculum design", "survey"],
    status: "idea",
    priority: "medium",
    venue: "KSPAI Journal / Computers & Education",
    notes: "Name it now — named frameworks get cited. Can be a companion paper to the Landscape survey.",
  },
];

// ── Import function ────────────────────────────────────────
async function seedResearch() {
  console.log(`\n🔬 Seeding ${ideas.length} research ideas into Firestore...\n`);

  const collection = db.collection("research_ideas");

  // Check if already seeded
  const existing = await collection.limit(1).get();
  if (!existing.empty) {
    console.log("⚠️  research_ideas already has documents.");
    console.log("   Pass --force to overwrite, or delete the collection manually.\n");
    if (!process.argv.includes("--force")) {
      process.exit(0);
    }
  }

  const batch = db.batch();
  const now = Timestamp.now();

  for (const idea of ideas) {
    const ref = collection.doc(); // auto-ID
    batch.set(ref, {
      ...idea,
      created_at: now,
      updated_at: now,
      assignedTo: idea.assignedTo ?? null,
      deadline: idea.deadline ?? null,
    });
    console.log(`  + ${idea.title} [${idea.status}/${idea.priority}]`);
  }

  await batch.commit();
  console.log(`\n✅ Done! ${ideas.length} ideas imported.\n`);
  console.log("Open the Admin Tracker at /admin/tracker to see them.\n");
}

seedResearch().catch(console.error);
