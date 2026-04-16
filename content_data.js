export const modelMetrics = {
    labels: ['Accuracy', 'Precision', 'Recall', 'F1-Score'],
    datasets: [
        {
            label: 'Naive Bayes',
            data: [95.2, 94.1, 93.8, 93.9],
            backgroundColor: '#94a3b8'
        },
        {
            label: 'Logistic Regression',
            data: [97.8, 97.2, 96.5, 96.8],
            backgroundColor: '#60a5fa'
        },
        {
            label: 'SVM (Best)',
            data: [98.4, 98.1, 97.9, 98.0],
            backgroundColor: '#2563eb'
        }
    ]
};

export const samplePredictions = [
    { text: "Final call for the budget review meeting.", true: "Ham", pred: "Ham", status: "success" },
    { text: "Winner! You have won a $1000 gift card!", true: "Spam", pred: "Spam", status: "success" },
    { text: "Please find the attached invoice for March.", true: "Ham", pred: "Ham", status: "success" },
    { text: "Increase your followers instantly. No password required.", true: "Spam", pred: "Spam", status: "success" },
    { text: "Hey, are we still on for coffee later?", true: "Ham", pred: "Ham", status: "success" }
];

export const preprocessingCode = `import re
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer

def clean_text(text):
    # Remove non-alphabetic characters
    text = re.sub(r'[^a-zA-Z]', ' ', text).lower()
    
    # Tokenize and remove stopwords
    words = text.split()
    words = [lemmatizer.lemmatize(w) for w in words 
             if w not in stop_words]
    
    return " ".join(words)

# Initialize TF-IDF Vectorizer
tfidf = TfidfVectorizer(max_features=5000)
X_tfidf = tfidf.fit_transform(df['clean_text'])`;

export const advancedCode = `from sklearn.model_selection import GridSearchCV
import joblib

# Hyperparameter Grid Search
param_grid = {
    'C': [0.1, 1, 10],
    'kernel': ['linear', 'rbf']
}
grid = GridSearchCV(SVC(), param_grid, cv=3)
grid.fit(X_train_tfidf, y_train)

# Save for Production
joblib.dump(grid.best_estimator_, 'spam_model.pkl')
joblib.dump(tfidf, 'vectorizer.pkl')`;
