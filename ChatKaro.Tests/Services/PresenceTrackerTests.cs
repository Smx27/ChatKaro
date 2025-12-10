using ChatKaro.API.Services;
using Xunit;

namespace ChatKaro.Tests.Services;

public class PresenceTrackerTests
{
    private readonly PresenceTracker _tracker;

    public PresenceTrackerTests()
    {
        _tracker = new PresenceTracker();
    }

    [Fact]
    public async Task UserConnected_AddsUser_WhenNew()
    {
        // Act
        var isOnline = await _tracker.UserConnected("alice", "conn1");

        // Assert
        Assert.True(isOnline);
        var users = await _tracker.GetOnlineUsers();
        Assert.Contains("alice", users);
    }

    [Fact]
    public async Task UserConnected_DoesNotReturnTrue_WhenAlreadyOnline()
    {
        // Arrange
        await _tracker.UserConnected("alice", "conn1");

        // Act
        var isOnline = await _tracker.UserConnected("alice", "conn2");

        // Assert
        Assert.False(isOnline);
        var connections = await _tracker.GetConnectionsForUser("alice");
        Assert.Equal(2, connections.Count);
    }

    [Fact]
    public async Task UserDisconnected_RemovesConnection()
    {
        // Arrange
        await _tracker.UserConnected("alice", "conn1");
        await _tracker.UserConnected("alice", "conn2");

        // Act
        var isOffline = await _tracker.UserDisconnected("alice", "conn1");

        // Assert
        Assert.False(isOffline);
        var connections = await _tracker.GetConnectionsForUser("alice");
        Assert.Single(connections);
        Assert.Contains("conn2", connections);
    }

    [Fact]
    public async Task UserDisconnected_RemovesUser_WhenLastConnectionRemoved()
    {
        // Arrange
        await _tracker.UserConnected("alice", "conn1");

        // Act
        var isOffline = await _tracker.UserDisconnected("alice", "conn1");

        // Assert
        Assert.True(isOffline);
        var users = await _tracker.GetOnlineUsers();
        Assert.DoesNotContain("alice", users);
    }
}