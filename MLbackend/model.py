import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
import joblib

# Load the data
data = pd.read_csv('diabetes.csv')

# Preprocessing
X = data.drop('Outcome', axis =1)
y = data['Outcome']

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state = 42)

# Scale the data
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)

# Train model
model = LogisticRegression(max_iter=1000)
model.fit(X_scaled, y_train)

# Save model
joblib.dump(model, 'model.pkl')
