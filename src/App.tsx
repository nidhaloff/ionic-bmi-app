import React, { useRef, useState } from "react";
import {
  IonApp,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonGrid,
  IonRow,
  IonInput,
  IonCol,
  IonItem,
  IonLabel,
  IonAlert,
} from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import BmiControls from "./components/bmiControls";
import BmiResult from "./components/bmiResult";
import { text } from "ionicons/icons";
import InputControl from "./components/inputControl";

const App: React.FC = () => {
  const [calculatedBmi, setCalculatedBmi] = useState<number>();
  const [calcUnits, setCalcunits] = useState<"mkg" | "ftlbs">("mkg");
  const [error, setError] = useState<string>();
  const enteredHeight = useRef<HTMLIonInputElement>(null);
  const enteredWeight = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const height = enteredHeight.current!.value;
    const weight = enteredWeight.current!.value;

    if (!height || !weight || +height <= 0 || +weight <= 0) {
      setError("Please enter a valid positive number as input!");
      return;
    }

    const weightConversionFactor = calcUnits === 'mkg'? 1: 2.2;
    const heightConversionFactor = calcUnits === 'mkg'? 1: 3.28;
    
    const res = (+weight/ weightConversionFactor) / ((+height / heightConversionFactor) * (+height / heightConversionFactor));
    setCalculatedBmi(res);
  };

  const resetAll = () => {
    enteredHeight.current!.value = "";
    enteredWeight.current!.value = "";
    setCalculatedBmi(undefined);
  };

  const resetError = () => {
    setError("");
  };

  const onChangeCalcUnits = (val: "mkg" | "ftlbs") => {
    setCalcunits(val);
    resetAll();
  };

  return (
    <IonApp>
      <IonHeader>
        <IonToolbar color="primary">
          <IonAlert
            isOpen={!!error}
            message={error}
            buttons={[{ text: "okay", handler: resetError }]}
          ></IonAlert>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <InputControl
                selectedValue={calcUnits}
                onSelectValue={onChangeCalcUnits}
              />
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Your Height ({calcUnits === "mkg" ? "meters" : "feets"})
                </IonLabel>
                <IonInput type="number" ref={enteredHeight}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">
                  Your Weight ({calcUnits === "mkg" ? "kg" : "lbs"})
                </IonLabel>
                <IonInput type="number" ref={enteredWeight}></IonInput>
              </IonItem>
            </IonCol>
          </IonRow>
          <BmiControls onCalculate={calculateBMI} onReset={resetAll} />

          {calculatedBmi && <BmiResult result={calculatedBmi} />}
        </IonGrid>
      </IonContent>
    </IonApp>
  );
};

export default App;
