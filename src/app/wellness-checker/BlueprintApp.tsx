"use client";

import { useReducer } from "react";
import IntakeForm from "@/components/blueprint/IntakeForm";
import BlueprintBuilder from "@/components/blueprint/BlueprintBuilder";
import {
  type IntakeAnswers,
  type WellnessIndicator,
  type TimelineSlot,
  INDICATORS,
  calculateBaselines,
  createEmptyTimeline,
} from "@/data/blueprint";

// ---------- State ----------

interface BlueprintState {
  stage: "intake" | "builder";
  intakeStep: number;
  intakeAnswers: Partial<IntakeAnswers>;
  baselines: Record<WellnessIndicator, number>;
  timeline: TimelineSlot[];
  projectionDays: 30 | 90;
  selectedTreatmentId: string | null;
  saveModalOpen: boolean;
}

// ---------- Actions ----------

type Action =
  | { type: "SET_INTAKE_STEP"; step: number }
  | { type: "UPDATE_INTAKE"; field: string; value: unknown }
  | { type: "COMPLETE_INTAKE"; answers: IntakeAnswers }
  | { type: "PLACE_TREATMENT"; hour: number; treatmentId: string }
  | { type: "REMOVE_TREATMENT"; hour: number; treatmentId: string }
  | { type: "SELECT_TREATMENT"; treatmentId: string | null }
  | { type: "SET_PROJECTION_DAYS"; days: 30 | 90 }
  | { type: "RESET_TIMELINE" }
  | { type: "TOGGLE_SAVE_MODAL" }
  | { type: "RESTART" };

// ---------- Initial State ----------

const emptyBaselines = Object.fromEntries(
  INDICATORS.map((k) => [k, 50])
) as Record<WellnessIndicator, number>;

const initialState: BlueprintState = {
  stage: "intake",
  intakeStep: 0,
  intakeAnswers: {
    energyMorning: 5,
    energyAfternoon: 5,
    energyEvening: 5,
    stressLevel: 5,
  },
  baselines: emptyBaselines,
  timeline: createEmptyTimeline(),
  projectionDays: 30,
  selectedTreatmentId: null,
  saveModalOpen: false,
};

// ---------- Reducer ----------

function reducer(state: BlueprintState, action: Action): BlueprintState {
  switch (action.type) {
    case "SET_INTAKE_STEP":
      return { ...state, intakeStep: action.step };

    case "UPDATE_INTAKE":
      return {
        ...state,
        intakeAnswers: { ...state.intakeAnswers, [action.field]: action.value },
      };

    case "COMPLETE_INTAKE": {
      const baselines = calculateBaselines(action.answers);
      return {
        ...state,
        stage: "builder",
        intakeAnswers: action.answers,
        baselines,
      };
    }

    case "PLACE_TREATMENT": {
      const timeline = state.timeline.map((slot) => {
        if (slot.hour !== action.hour) return slot;
        if (slot.treatments.length >= 2) return slot;
        if (slot.treatments.includes(action.treatmentId)) return slot;
        return { ...slot, treatments: [...slot.treatments, action.treatmentId] };
      });
      return { ...state, timeline, selectedTreatmentId: null };
    }

    case "REMOVE_TREATMENT": {
      const timeline = state.timeline.map((slot) => {
        if (slot.hour !== action.hour) return slot;
        return {
          ...slot,
          treatments: slot.treatments.filter((t) => t !== action.treatmentId),
        };
      });
      return { ...state, timeline };
    }

    case "SELECT_TREATMENT":
      return {
        ...state,
        selectedTreatmentId:
          state.selectedTreatmentId === action.treatmentId
            ? null
            : action.treatmentId,
      };

    case "SET_PROJECTION_DAYS":
      return { ...state, projectionDays: action.days };

    case "RESET_TIMELINE":
      return {
        ...state,
        timeline: createEmptyTimeline(),
        selectedTreatmentId: null,
      };

    case "TOGGLE_SAVE_MODAL":
      return { ...state, saveModalOpen: !state.saveModalOpen };

    case "RESTART":
      return initialState;

    default:
      return state;
  }
}

// ---------- Component ----------

export default function BlueprintApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  if (state.stage === "intake") {
    return (
      <IntakeForm
        step={state.intakeStep}
        answers={state.intakeAnswers}
        onUpdate={(field, value) =>
          dispatch({ type: "UPDATE_INTAKE", field, value })
        }
        onNext={() =>
          dispatch({ type: "SET_INTAKE_STEP", step: state.intakeStep + 1 })
        }
        onBack={() =>
          dispatch({ type: "SET_INTAKE_STEP", step: state.intakeStep - 1 })
        }
        onComplete={(answers) =>
          dispatch({ type: "COMPLETE_INTAKE", answers })
        }
      />
    );
  }

  return <BlueprintBuilder state={state} dispatch={dispatch} />;
}
