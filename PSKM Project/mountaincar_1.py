import numpy as np
from scipy.integrate import solve_ivp
import matplotlib.pyplot as plt
import matplotlib.animation as animation

# System parameters
g = 9.81  # Gravitational constant (m/s^2)
m = 1.0   # Mass of the car (kg)D
k = 3.0   # Scaling factor for the slope's curvature

# Shift the mountain profile so the peak is at the center
peak_shift = np.pi / (2 * k)  # Horizontal shift to align peak at x = 0

# Disturbance parameters
disturbance_force = 5  # Magnitude of the disturbance
disturbance_interval = 0.5  # Time interval for disturbances

# Restart threshold
frame_restart_threshold = 1.2  # Restart simulation if the car goes out of this range

# State-space dynamics of the Mountain Car with disturbances
def mountain_car_dynamics(t, state):
    x, v, v_hat, e_int = state  # Added integral of error as new state
    
    # Get control force based on the estimated state
    F = control_system(x, v_hat, e_int)  # Control using position, estimated velocity, and integral error
    
    a = -g * np.cos(k * (x + peak_shift)) + F / m  # Acceleration with control

    # Add disturbance every disturbance_interval seconds
    if int(t) % disturbance_interval == 0 and int(t * 100) % 100 == 0:
        a += disturbance_force / m  # Add a disturbance force

    # Reduced-order observer dynamics (estimate only velocity)
    L_v = 45.43  # Observer gain for velocity
    v_hat_dot = a - L_v * (v_hat - v)  # Velocity observer update (estimated velocity)

    # Integral error dynamics
    e_int_dot = x  # Integral of position error (e = Cx-r with C = [1 0]: position as output and r = 0)
    
    return [v, a, v_hat_dot, e_int_dot]  # Return updated state dynamics

# Placeholder for a user-defined control system
def control_system(x, v_hat, e_int):
    # Define the gain matrix K
    k_1 = 41.43  # Proportional gain for position
    k_2 = 6  # Derivative gain for estimated velocity
    k_3 = 8  # Integral gain (new)
    K = np.array([k_1, k_2, k_3])  # Gain matrix combining position, estimated velocity, and integral error feedback

    # Compute the control force using the actual position, estimated velocity, and integral error
    F = -np.dot(K, np.array([x, v_hat, e_int]))  # Apply state feedback with integral error

    return F

# Function to reset the simulation if the car moves out of frame
def reset_simulation():
    global current_state, solution_time, solution_states
    current_state = initial_state.copy()
    solution_time = [0]
    solution_states = [current_state]

# Initial conditions for position, velocity, estimated velocity (v_hat), and integral of error (e_int)
initial_state = [np.random.uniform(-1, 1), 0.0, 0.0, 0.0]  # x, v, v_hat, e_int (position, velocity, estimated velocity, integral error)
current_state = initial_state.copy()
solution_time = [0]
solution_states = [current_state]

# Solver function to update the state
def update_solution():
    global current_state, solution_time, solution_states
    t_last = solution_time[-1]
    # Solve for the next time step
    sol = solve_ivp(mountain_car_dynamics, [t_last, t_last + dt], current_state, t_eval=[t_last + dt])
    solution_time.append(sol.t[-1])
    solution_states.append(sol.y[:, -1])
    current_state = sol.y[:, -1]
    # Check if the car goes out of frame
    if abs(current_state[0]) > frame_restart_threshold:
        reset_simulation()

# Simulation parameters
t_span = (0, 10)  # Simulate for 10 seconds
dt = 0.01         # Time step

# Visualization: Animate the Mountain Car
fig, ax = plt.subplots(figsize=(10, 5))
ax.set_xlim(-1.2, 1.2)
ax.set_ylim(-1.0, 1.0)
ax.set_xlabel("Position (x)")
ax.set_ylabel("Height")
ax.set_title("Mountain Car With Disturbances, Reduced-order Compensator, and Robust Tracking")

# Mountain and Car representation
mountain_x = np.linspace(-1.2, 1.2, 500)
mountain_y = np.sin(k * (mountain_x + peak_shift)) / k  # Adjusted mountain profile
car, = ax.plot([], [], 'ro', markersize=8)
mountain_line, = ax.plot(mountain_x, mountain_y, 'k-', lw=2)

# Initialize the animation
def init():
    car.set_data([], [])
    return car, mountain_line

# Update function for the animation
def update(frame):
    update_solution()
    car_x = current_state[0]
    car_y = np.sin(k * (car_x + peak_shift)) / k  # Compute height from the adjusted mountain profile
    car.set_data([car_x], [car_y])
    return car, mountain_line

# Create the animation
ani = animation.FuncAnimation(fig, update, frames=2000, init_func=init, blit=True, interval=dt * 1000)

plt.show()