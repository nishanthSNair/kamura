"use client";

import { useReducer } from "react";
import InteractiveBody from "@/components/checker/InteractiveBody";
import ConcernPicker from "@/components/checker/ConcernPicker";
import CheckerResults from "@/components/checker/CheckerResults";
import CheckerProgress from "@/components/checker/CheckerProgress";
import {
  type BodyZone,
  type WellnessConcern,
  type ConcernDuration,
} from "@/data/wellness-concerns";
import { rankTreatments, type MatchedTreatment } from "@/data/wellness-checker";

type Stage = "body-map" | "concern-picker" | "results";

interface CheckerState {
  stage: Stage;
  selectedZone: BodyZone | null;
  selectedConcerns: WellnessConcern[];
  completedZones: BodyZone[];
  duration: ConcernDuration | null;
  results: MatchedTreatment[];
}

type Action =
  | { type: "SELECT_ZONE"; zone: BodyZone }
  | {
      type: "ADD_CONCERNS";
      concerns: WellnessConcern[];
      duration?: ConcernDuration;
    }
  | { type: "VIEW_RESULTS" }
  | { type: "ADD_ANOTHER_ZONE" }
  | { type: "RESTART" };

const initialState: CheckerState = {
  stage: "body-map",
  selectedZone: null,
  selectedConcerns: [],
  completedZones: [],
  duration: null,
  results: [],
};

function reducer(state: CheckerState, action: Action): CheckerState {
  switch (action.type) {
    case "SELECT_ZONE":
      return { ...state, stage: "concern-picker", selectedZone: action.zone };

    case "ADD_CONCERNS": {
      const newConcerns = [...state.selectedConcerns, ...action.concerns];
      const zone = state.selectedZone;
      const completedZones =
        zone && !state.completedZones.includes(zone)
          ? [...state.completedZones, zone]
          : state.completedZones;
      return {
        ...state,
        selectedConcerns: newConcerns,
        completedZones,
        duration: action.duration || state.duration,
      };
    }

    case "VIEW_RESULTS": {
      const results = rankTreatments({
        selectedConcerns: state.selectedConcerns,
        duration: state.duration || undefined,
      });
      return { ...state, stage: "results", results };
    }

    case "ADD_ANOTHER_ZONE":
      return { ...state, stage: "body-map", selectedZone: null };

    case "RESTART":
      return initialState;

    default:
      return state;
  }
}

export default function WellnessCheckerApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const stepNumber =
    state.stage === "body-map" ? 0 : state.stage === "concern-picker" ? 1 : 2;

  return (
    <section className="min-h-screen bg-cream dark:bg-[#14110E]">
      {/* Progress indicator — shown on steps 2 and 3 */}
      {state.stage !== "body-map" && (
        <div className="fixed top-16 left-0 right-0 z-40 bg-cream/80 dark:bg-[#14110E]/80 backdrop-blur-sm py-3 border-b border-gray-200/50 dark:border-white/[0.04]">
          <div className="max-w-2xl mx-auto px-6">
            <CheckerProgress currentStep={stepNumber} totalSteps={3} />
          </div>
        </div>
      )}

      {state.stage === "body-map" && (
        <InteractiveBody
          completedZones={state.completedZones}
          onSelectZone={(zone) =>
            dispatch({ type: "SELECT_ZONE", zone })
          }
          hasSelectedConcerns={state.selectedConcerns.length > 0}
          onViewResults={() => dispatch({ type: "VIEW_RESULTS" })}
        />
      )}

      {state.stage === "concern-picker" && state.selectedZone && (
        <ConcernPicker
          zone={state.selectedZone}
          existingConcerns={state.selectedConcerns}
          onSubmit={(concerns, duration) => {
            dispatch({ type: "ADD_CONCERNS", concerns, duration });
            dispatch({ type: "VIEW_RESULTS" });
          }}
          onAddAnother={(concerns, duration) => {
            dispatch({ type: "ADD_CONCERNS", concerns, duration });
            dispatch({ type: "ADD_ANOTHER_ZONE" });
          }}
          onBack={() => dispatch({ type: "ADD_ANOTHER_ZONE" })}
        />
      )}

      {state.stage === "results" && (
        <CheckerResults
          results={state.results}
          selectedConcerns={state.selectedConcerns}
          completedZones={state.completedZones}
          onAddAnother={() => dispatch({ type: "ADD_ANOTHER_ZONE" })}
          onRestart={() => dispatch({ type: "RESTART" })}
        />
      )}
    </section>
  );
}
