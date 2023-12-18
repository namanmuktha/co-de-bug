# app.py
import streamlit as st
import pickle

# Load your pickled model
with open('recommendSimilarMedicines.pkl', 'rb') as model_file:
    your_model = pickle.load(model_file)

# Streamlit app
def main():
    st.title("Streamlit Pickle Deployment")
    a
    # Get user input
    user_input = st.text_input("Enter some input:")

    # Make prediction using the model
    prediction = your_model.predict([user_input])[0]
    st.write(f"Prediction: {prediction}")

    # Display messages
    messages = st.session_state.get('messages', [])
    for i, msg in enumerate(messages[1:]):
        if i % 2 == 0:
            st.text(msg.content)
            # Add more customization or styling if needed for user messages
        else:
            st.text(msg.content)
            # Add more customization or styling if needed for AI messages

if __name__ == "__main__":
    main()
