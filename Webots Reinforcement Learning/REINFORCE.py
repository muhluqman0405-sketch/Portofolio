
from controller import Supervisor
import numpy as np
import math
import random
import os
import pickle


# ===============================
#   PARAMETER TRAINING & ROBOT
# ===============================
timestep = 64
max_speed = 6.28

num_episodes = 2000
max_steps = 600

# =================================
#   MODEL JARINGAN NEURAL
# =================================
class PolicyNetwork:
    def __init__(self, input_size, hidden_size, output_size, lr=0.0005):
        self.lr = lr

        self.W1 = np.random.randn(hidden_size, input_size) * 0.1
        self.b1 = np.zeros((hidden_size, 1))
        self.W2 = np.random.randn(output_size, hidden_size) * 0.1
        self.b2 = np.zeros((output_size, 1))

    def forward(self, state):
        z1 = np.dot(self.W1, state) + self.b1
        a1 = np.tanh(z1)

        z2 = np.dot(self.W2, a1) + self.b2
        exp_scores = np.exp(z2 - np.max(z2))
        probs = exp_scores / np.sum(exp_scores)

        return probs, (state, z1, a1, z2)

    def backward(self, grad_output, cache):
        state, z1, a1, z2 = cache

        dW2 = np.dot(grad_output, a1.T)
        db2 = grad_output

        da1 = np.dot(self.W2.T, grad_output)
        dz1 = da1 * (1 - np.tanh(z1) ** 2)

        dW1 = np.dot(dz1, state.T)
        db1 = dz1

        self.W1 -= self.lr * dW1
        self.b1 -= self.lr * db1
        self.W2 -= self.lr * dW2
        self.b2 -= self.lr * db2


# =================================
#         AGEN REINFORCE
# =================================
class Agent_REINFORCE:
    def __init__(self):
        self.robot = Supervisor()
        self.timestep = int(self.robot.getBasicTimeStep())

        # MOTOR BENAR
        self.left_motor = self.robot.getDevice("left wheel")
        self.right_motor = self.robot.getDevice("right wheel")

        self.left_motor.setPosition(float('inf'))
        self.right_motor.setPosition(float('inf'))
        self.left_motor.setVelocity(0)
        self.right_motor.setVelocity(0)

        # SENSOR BENAR
        self.dist_sensors = []
        for i in [1, 2]:
            s = self.robot.getDevice(f"so{i}")
            s.enable(self.timestep)
            self.dist_sensors.append(s)


        # Goal
        self.goal_position = np.array([3.45, -3.07])  # Lokasi sesuai gambar

        # Max jarak arena 9x9
        self.max_distance = math.sqrt(9**2 + 9**2)

        # Network
        self.model = PolicyNetwork(input_size=3, hidden_size=32, output_size=3)

        # Episode memory
        self.reset_episode()

    def reset_episode(self):
        self.log_probs = []
        self.rewards = []

    # ======================================
    #          Fungsi Sensor & State
    # ======================================
    def get_robot_position(self):
        gps = self.robot.getDevice("gps")
        gps.enable(timestep)
        pos = gps.getValues()
        return np.array([pos[0], pos[2]])

    def get_distance_to_goal(self):
        p = self.get_robot_position()
        d = np.linalg.norm(self.goal_position - p)
        return min(d / self.max_distance, 1.0)

    def get_sensor_state(self):
        readings = []
        for s in self.dist_sensors:
            raw = s.getValue()
            norm = min(raw / 1000.0, 1.0)
            readings.append(norm)
        return readings

    def get_state(self):
        d = self.get_distance_to_goal()
        s1, s2 = self.get_sensor_state()
        return np.array([[d], [s1], [s2]])

    # ======================================
    #               ACTIONS
    # ======================================
    def choose_action(self, state):
        probs, cache = self.model.forward(state)
        action = np.random.choice(len(probs), p=probs.flatten())

        # log prob
        self.log_probs.append((probs, action, cache))
        return action

    def apply_action(self, action):
        if action == 0:     # Forward
            lw = max_speed
            rw = max_speed
        elif action == 1:   # Left
            lw = 0.2 * max_speed
            rw = max_speed
        else:               # Right
            lw = max_speed
            rw = 0.2 * max_speed

        self.left_motor.setVelocity(lw)
        self.right_motor.setVelocity(rw)

    # ======================================
    #               Reward
    # ======================================
    def compute_reward(self, state):
        d, s1, s2 = state.flatten()

        reward = 0.0

        # Mendekat ke goal → reward +  
        reward += (1 - d) * 0.02

        # Jika sensor melihat obstacle dekat
        if s1 > 0.8 or s2 > 0.8:
            reward -= 0.003

        # Jika sampai goal
        if d < 0.05:
            reward += 5
            return reward, True

        return reward, False

    # ======================================
    #           Update Model
    # ======================================
    def update_policy(self):
        returns = []
        G = 0
        gamma = 0.99

        for r in reversed(self.rewards):
            G = r + gamma * G
            returns.insert(0, G)

        returns = np.array(returns)
        returns = (returns - returns.mean()) / (returns.std() + 1e-6)

        for (probs, action, cache), G in zip(self.log_probs, returns):

            grad_output = -probs
            grad_output[action] += 1
            grad_output *= G

            self.model.backward(grad_output, cache)

    # ======================================
    #           MAIN TRAINING LOOP
    # ======================================
    def train(self):
        for ep in range(num_episodes):

            self.reset_episode()

            for step in range(max_steps):
                if self.robot.step(timestep) == -1:
                    break

                state = self.get_state()
                action = self.choose_action(state)
                self.apply_action(action)

                reward, done = self.compute_reward(state)
                self.rewards.append(reward)

                if done:
                    break

            self.update_policy()

            print(f"Episode {ep+1}/{num_episodes} | Reward: {sum(self.rewards):.3f}")

        # Save model
        with open("policy_model.pkl", "wb") as f:
            pickle.dump(self.model, f)
        print("Training selesai. Model disimpan!")

# =======================================
#               MAIN
# =======================================
if __name__ == "__main__":
    agent = Agent_REINFORCE()
    agent.train()
