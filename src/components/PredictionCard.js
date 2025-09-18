import React, { useEffect, useState } from 'react';
import { Card, Text, Button } from 'react-native-paper';
import { predictNextMonth } from '../ml/predictor';

export default function PredictionCard({ expenses }) {
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    try {
      const p = await predictNextMonth(expenses);
      setPrediction(p);
    } catch (e) {
      setPrediction(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expenses]);

  return (
    <Card style={{ marginTop: 16 }}>
      <Card.Title title="Prediction" subtitle="Next month's spending" />
      <Card.Content>
        {prediction == null ? (
          <Text>Tap refresh to compute prediction.</Text>
        ) : (
          <Text variant="titleMedium">${prediction.toFixed(2)}</Text>
        )}
      </Card.Content>
      <Card.Actions>
        <Button onPress={run} loading={loading} disabled={loading}>
          Refresh
        </Button>
      </Card.Actions>
    </Card>
  );
}


